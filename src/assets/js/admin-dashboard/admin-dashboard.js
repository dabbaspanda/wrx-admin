/* eslint-disable no-useless-escape */
import 'promise-polyfill/src/polyfill';
import 'isomorphic-fetch';
import Swal from 'sweetalert2';
import { headers } from '../../data/headers';

let announcementsSwitch;
let subscriptionBar;
let subscribeButtons;
let sendSubscriptionsButton;
let jobTitle;
const cSuiteTitles = ['CxO', 'CMO', 'CIO', 'CFO', 'Discuss'];
const subscriptionsArray = [];
// eslint-disable-next-line max-len
const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

document.addEventListener('DOMContentLoaded', () => {

});
