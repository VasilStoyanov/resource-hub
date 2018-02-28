import React from 'react';
import Text from './Table/Dts/Text';
import NavButton from './Table/Dts/NavButton';
import Button from './Table/Dts/Button';
import MRow from './Table/MRow';

const tasksTablerowSchema = [{
  propName: 'userId',
  renderFunction: Text('ceco'),
}, {
  propName: 'ip',
  renderFunction: Text('ceco'),
}, {
  propName: 'username',
  renderFunction: Text('ceco'),
}, {
  propName: 'supervisor',
  renderFunction: Button('eighty-percentage-width thirty-pxs-border-radius'),
}, {
  propName: 'admin',
  renderFunction: Button('eighty-percentage-width thirty-pxs-border-radius'),
}, {
  propName: 'moderator',
  renderFunction: Button('eighty-percentage-width thirty-pxs-border-radius'),
}, {
  propName: 'bannedBtn',
  renderFunction: NavButton('eighty-percentage-width thirty-pxs-border-radius'),
}];


const tasksTableColumnNames = [
  'User Id',
  'Ip address',
  'Username',
  'Supervisor',
  'Admin',
  'Moderator',
  'Actions',
];

const MUsersPermissionsTable = ({
  items, swapUsersRole, userGroups, id,
}) => {
  const processedItems = items.map((item) => {
    const { roles, ...processedItem } = item;

    processedItem.supervisor = {
      type: item.roles.indexOf('Supervisor') >= 0 ? 'danger' : 'success',
      text: item.roles.indexOf('Supervisor') >= 0 ? 'Remove' : 'Add',
      disabled: true,
      checked: item.roles.indexOf('Supervisor') >= 0,
    };

    processedItem.admin = (userGroups.indexOf('Supervisor') > -1) ? {
      type: item.roles.indexOf('Admin') >= 0 ? 'danger' : 'success',
      text: item.roles.indexOf('Admin') >= 0 ? 'Remove' : 'Add',
      handleClick: swapUsersRole.admin(item.userId),
      checked: item.roles.indexOf('Admin') >= 0,
    } : {
      type: item.roles.indexOf('Admin') >= 0 ? 'danger' : 'success',
      text: item.roles.indexOf('Admin') >= 0 ? 'Remove' : 'Add',
      disabled: true,
    };

    processedItem.moderator = (userGroups.indexOf('Supervisor') > -1 ||
    userGroups.indexOf('Admin') > -1) ? {
        type: item.roles.indexOf('Moderator') >= 0 ? 'danger' : 'success',
        text: item.roles.indexOf('Moderator') >= 0 ? 'Remove' : 'Add',
        handleClick: swapUsersRole.moderator(item.userId),
        checked: item.roles.indexOf('Moderator') >= 0,
      } : {
        type: item.roles.indexOf('Moderator') >= 0 ? 'danger' : 'success',
        text: item.roles.indexOf('Moderator') >= 0 ? 'Remove' : 'Add',
        disabled: true,
      };

    processedItem.bannedBtn = {
      type: 'danger',
      text: 'Ban user',
      disabled: false,
      url: '/users/login',
    };
    return processedItem;
  });

  let index = 0;

  const rows = processedItems.map((item) => {
    index += 1;

    return (
      <div key={index}>
        <MRow
          data={item}
          rowSchema={tasksTablerowSchema}
          columnNames={tasksTableColumnNames}
          className="m-admin-table-row"
        />
      </div>);
  });

  return (
    <div id={id}>
      {rows}
    </div>);
};

export default MUsersPermissionsTable;

