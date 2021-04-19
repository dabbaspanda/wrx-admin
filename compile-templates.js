const pug = require('pug');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const dir = `${__dirname}/dist`;
const preDir = `${__dirname}/pre-dist`;

if (!fs.existsSync(path.resolve(dir, 'templates'))) {
	fs.mkdirSync(path.resolve(dir, 'templates'));
}

/**
 * Recursively copies a directory to a new location.
 * If the new directory location doesn't exist, it will create it from one level up only.
 *
 * @param {Path} from File path location of source
 * @param {Path} to File path location of destination
 */
function copyFolderSync(from, to) {
	fs.mkdirSync(to);
	fs.readdirSync(from).forEach((element) => {
		if (fs.lstatSync(path.join(from, element)).isFile()) {
			fs.copyFileSync(path.join(from, element), path.join(to, element));
		} else {
			copyFolderSync(path.join(from, element), path.join(to, element));
		}
	});
}

/**
 * Recursively finds all pug dependency files from a provided file.
 * Marks pug files without side effects as pure, to be hoisted to the topmost import level possible
 * Mark a file with the comment
 *  //- pug-impure
 * anywhere in the file to disable hoisting
 *
 * @param {String} filepath Full pathname of a file to parse dependencies for
 * @param {Object} dependencies Running list of parsed recursive dependencies
 * @param {Boolean} isRoot Is this the root file in this dependency graph?
 */
function findFileDependencies(filepath, dependencies, isRoot) {
	const fileLines = fs.readFileSync(filepath, 'UTF-8').split('\n');
	const currentDir = path.dirname(filepath);
	const imports = [];
	let isPure = true;
	let inMixin = false;
	let indentation = 0;
	fileLines.forEach((line) => {
		if (line.match(/^(\s*|\s*\/\/-?.*)$/)) {
			if (line.match(/^\s*\/\/-\s*pug-impure/)) {
				isPure = false;
			}
			return;
		}
		const currentIndentation = (line.match(/^(\s*)/)[1] || '').length;
		if (inMixin && currentIndentation <= indentation) {
			inMixin = false;
		}

		if (line.match(/\s?include\s+/)) {
			const originalPath = line.replace(/^\s*include\s*/, '').trim();
			imports.push({
				filepath: path.resolve(currentDir, originalPath),
				originalPath,
			});
		} else if (isPure) {
			if (line.match(/\s*mixin/)) {
				inMixin = true;
				indentation = line.split('mixin')[0].length;
			} else if (!inMixin) {
				isPure = false;
			}
		}
	});
	if (isPure) {
		try {
			const output = pug.renderFile(filepath);
			if (output.length > 0) {
				isPure = false;
			}
		} catch (e) {
			isPure = false;
		}
		if (!isPure) {
			console.error('File', filepath, 'seemed pure enough for hoisting, but isn\'t! Look into this.');
		}
	}

	dependencies[filepath] = {
		filepath,
		imports,
		isPure,
		isRoot,
	};
	imports.forEach((fileImport) => findFileDependencies(fileImport.filepath, dependencies));
}

/**
 * Compiles a minified pug template for client-side consumption.
 * Minifies pure imports to the smallest possible import footprint by hoisting them to the root level.
 *
 * NOTE: This process will not maintain inline var state - Ensure pure files are actually pure!
 * Mark a file with the comment
 *  //- pug-impure
 * anywhere in the file to disable hoisting
 *
 * @TODO: Add support for multiline pug comments in hoistable files
 * @param {String} filepath Relative pathname to a source pug file to compile for client consumption
 * @param {String} template Output filename for compiled pug template
 */
function writeCompiledFile(filepath, template) {
	const preTemplates = path.resolve(preDir, 'pre-templates');
	const preFilepath = filepath.replace('src/views', preTemplates);
	if (fs.existsSync(preTemplates)) {
		rimraf.sync(preTemplates);
	}
	copyFolderSync(path.resolve('src/views'), preTemplates);

	const dependencies = {};
	findFileDependencies(filepath.replace('src/views', preTemplates), dependencies);

	const pureFiles = Object.keys(dependencies).filter((key) => (dependencies[key].isPure));
	Object.keys(dependencies).forEach((key) => {
		const dependencyFile = dependencies[key];
		const removals = [];
		dependencyFile.imports.forEach((rawImport) => {
			if (pureFiles.indexOf(rawImport.filepath) > -1) {
				removals.push(rawImport.originalPath);
			}
		});

		if (removals.length || dependencyFile.isRoot) {
			let file = fs.readFileSync(dependencyFile.filepath, 'UTF-8');
			removals.forEach((removal) => {
				file = file.replace(new RegExp(`\\s*include\\s*${removal}`, 'gi'), '');
			});

			if (dependencyFile.isRoot) {
				file = pureFiles.reduce((acc, current) => `include ${path.relative(path.dirname(preFilepath), current)}\n${acc}`, '') + file;
			}

			fs.writeFileSync(dependencyFile.filepath, file, 'UTF-8');
		}
	});

	if (pureFiles.length) {
		console.debug('Hoisted', pureFiles.length, 'pure includes to the root level:');
		console.debug(pureFiles);
	}

	const compiledTemplate = pug.compileFileClient(preFilepath, {
		compileDebug: false,
	}).replace('function template(locals)', 'export function template(locals)');

	fs.writeFileSync(
		path.resolve(dir, 'templates', template),
		compiledTemplate,
	);
}
