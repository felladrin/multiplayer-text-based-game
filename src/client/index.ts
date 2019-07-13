import {connect} from "socket.io-client";
import jQuery = require("jquery");
window['$'] = window['jQuery'] = jQuery;
import GoldenLayout = require("golden-layout");
import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";
import './index.scss'
import {ServerToClientEvent} from "../common/enum/ServerToClientEvent";
import {ClientToServerEvent} from "../common/enum/ClientToServerEvent";

const socket = connect();

const layout = new GoldenLayout({
    content: [{
        type: 'column',
        content: [{
            type: 'component',
            componentName: 'Events'
        }, {
            type: 'component',
            componentName: 'Command',
            height: 15
        }]
    }]
});

layout.registerComponent('Events', (container) => {
    const terminalContainer = jQuery<HTMLDivElement>('<div class="eventsDiv"/>');

    jQuery(container.getElement()).append(terminalContainer);

    socket.on(ServerToClientEvent.AppendToEventsPanel, (message) => {
        terminalContainer.append(jQuery.parseHTML(`<div>${message}</div>`));
    });
});

layout.registerComponent('Command', (container) => {
    const form = jQuery<HTMLFormElement>('<form class="form"/>');
    const messageBox = jQuery<HTMLInputElement>('<input class="messageBox" autocapitalize="off"/>');
    const sendButton = jQuery<HTMLButtonElement>('<button class="sendButton">Send</button>');

    form.append(messageBox);
    form.append(sendButton);
    form.on('submit', (event) => {
        event.preventDefault();
        socket.emit(ClientToServerEvent.ExecuteCommand, messageBox.val());
        messageBox.val('');
    });

    jQuery(container.getElement()).append(form);
});

layout.init();