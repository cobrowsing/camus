import React, { Component } from 'react';

export default class Invite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            toggled: false
        };

        this.toggleExpandButton = React.createRef();

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCopyLink = this.handleCopyLink.bind(this);
    }

    render() {
        if (!this.state.visible) {
            return null;
        }

        return (
            <div
                className='dialog slide-down invite-box'
                role='dialog'
                aria-labelledby='share-link-title'
            >
                <h1 id='share-link-title' className='sr-only'>
                    Share the link to invite others
                </h1>
                <div className='input-line'>
                    <button
                        className='icon-button'
                        onClick={this.handleClose}
                        aria-label='Close dialog'
                    >
                        <i className='material-icons'>close</i>
                    </button>
                    <input
                        onClick={this.handleToggle}
                        type='button'
                        value='Share the link to invite others'
                        readOnly={true}
                        ref={this.toggleExpandButton}
                    />
                </div>
                { this.state.toggled &&
                <div className='input-line'>
                    <button
                        type='button'
                        onClick={this.handleCopyLink}
                        aria-label='Copy the room link'
                    >
                        <i className='material-icons'>content_copy</i>
                    </button>
                    <input
                        className='invitation-link'
                        name='invitation-link'
                        type='text'
                        value={window.location.href}
                        readOnly={true}
                    />
                </div>
                }
            </div>
        );
    }

    handleToggle() {
        this.setState(state  => {
            const toggled = !state.toggled;
            return { toggled };
        });
    }

    handleClose() {
        this.setState(state  => {
            const visible = !state.visible;
            return { visible };
        });
    }

    handleCopyLink() {
        // Copy the room link to the clipboard
        const link = document.querySelector('.invitation-link');
        link.focus();
        link.select();
        document.execCommand('copy');
    }
}
