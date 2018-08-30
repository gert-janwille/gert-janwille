import {observable, action} from 'mobx';
import {isEmpty} from 'lodash';
import io from 'socket.io-client';

import InviteAPI from '../lib/api/invite';
import {set, get} from '../lib/localStorage';

class Store {
  @observable socket = io(`/`);
  @observable data = {};
  @observable users = [];
  @observable msgs = [];
  @observable me = {};

  constructor() {
    this.socket.on(`init`, this.handleWSInit);
    this.socket.on(`join`, this.handleWSJoin);
    this.socket.on(`leave`, this.handleWSLeave);
    this.socket.on(`msg`, this.handleWSMsg);
    this.socket.on(`setUsername`,this.handleWSUsername);
  }

  @action sendMsg = msg => {
    if(msg.startsWith("SET username=")) {
      const n = msg.split('=')[1];

      this.me.old_username = this.me.username;
      this.me.username = n;

      this.socket.compress(true).emit(`setUsername`, n);
      set('username', n);

      return 0;
    }

    const {id: socketId} = this.socket;
    this.msgs.push({msg, socketId, user: this.me});
    this.socket.compress(true).emit(`msg`, msg);
  }


  @action handleWSInit = ({users, msgs, user}) => {
    const {id: socketId} = this.socket;

    this.me = user;

    this.msgs = msgs.map(u => {
      if(u.socketId === socketId) u.isMe = true;
      return u;
    });

    this.users = users.map(u => {
      if(u.socketId === socketId) u.isMe = true;
      return u;
    });

    if (get('username')) {
      const storeName = get('username');
      this.socket.compress(true).emit(`setUsername`, storeName);
      this.me.old_username = this.me.username;
      this.me.username = storeName;
    }

  }

  @action handleWSJoin = user => {
    this.msgs.push({msg: `${user.username} joined`, socketId: user.socketId, user, info: true});
    this.users.push(user);
  }

  @action handleWSLeave = ({socketId, user}) => {
    this.msgs.push({msg: `${user.username} Left`, socketId, user, info: true});
    this.users = this.users.filter(u => u.socketId !== socketId);
  }

  @action handleWSMsg = msg => this.msgs.push(msg);

  @action handleWSUsername = user => this.msgs.push({msg: `${user.old_username} changed username to ${user.username}`, socketId: user.socketId, user, info: true});

  @action redeem = (invite) => {
    const errors = this.validate(invite, ['invite']);
    if (!isEmpty(errors)) return this.errors = errors;

    return InviteAPI.redeem(invite)
      .then(({token}) => {
        if (!token) return false;
        set('token', token);
        return true;
      })
      .catch(() => false);

  }

  validate = (data, fields) => {
    const errors = {};
    fields.map(f => !data[f] ? errors[f] = `Please fill in a ${f}` : null);
    return errors;
  }

}

const store = new Store();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store;
