import React from 'react';
import Text from './Table/Dts/Text';
import Checkbox from './Table/Dts/Checkbox';
import NavButton from './Table/Dts/NavButton';
import Table from './Table/Table';


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
  renderFunction: Checkbox('ceco'),
}, {
  propName: 'admin',
  renderFunction: Checkbox('ceco'),
}, {
  propName: 'moderator',
  renderFunction: Checkbox('ceco'),
}, {
  propName: 'bannedBtn',
  renderFunction: NavButton('ceco'),
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

const UsersPermissionsTable = ({
  items, swapUsersRole, userGroups, id,
}) => {
  const processedItems = items.map((item) => {
    const { roles, ...processedItem } = item;

    processedItem.supervisor = {
      checked: item.roles.indexOf('Supervisor') >= 0,
      disabled: true,
    };

    processedItem.admin = (userGroups.indexOf('Supervisor') > -1) ? {
      checked: item.roles.indexOf('Admin') >= 0,
      handleClick: swapUsersRole.admin(item.userId),
    } : {
      checked: item.roles.indexOf('Admin') >= 0,
      disabled: true,
    };

    processedItem.moderator = (userGroups.indexOf('Supervisor') > -1 ||
    userGroups.indexOf('Admin') > -1) ? {
        checked: item.roles.indexOf('Moderator') >= 0,
        handleClick: swapUsersRole.moderator(item.userId),
      } : {
        checked: item.roles.indexOf('Moderator') >= 0,
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

  return (<div>
    <Table
      id={id}
      items={processedItems}
      rowSchema={tasksTablerowSchema}
      columnNames={tasksTableColumnNames}
      classNameTbl="table"
      classNameRow="tableRow"
    />
  </div>);
};

export default UsersPermissionsTable;

