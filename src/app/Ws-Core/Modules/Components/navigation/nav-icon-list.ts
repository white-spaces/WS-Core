import { Nav, SubNav } from './nav';

export const Navigation: Nav[] = [
    {name: 'Home', url: '../home', imageUrl: '../../../../assets/feather/home.svg'},
    {name: 'Activity', url: '../', imageUrl: '../../../../assets/feather/activity.svg'},
    {name: 'Editor', url: '../editor', imageUrl: '../../../../assets/feather/layout.svg'},
    {name: 'Blog', url: '../blog', imageUrl: '../../../../assets/feather/edit.svg'},
    {name: 'Grid', url: '../', imageUrl: '../../../../assets/feather/grid.svg'},
    {name: 'Database', url: '../', imageUrl: '../../../../assets/feather/database.svg'},
    {name: 'Users', url: '../teams', imageUrl: '../../../../assets/feather/users.svg'},
    {name: 'Settings', url: '../settings', imageUrl: '../../../../assets/feather/settings.svg'},

];

export const SubNavigation: SubNav[] = [
    {name: 'Profile', url: '', imageUrl: '../../../../assets/feather/user.svg'},
    {name: 'Account', url: '', imageUrl: '../../../../assets/feather/shield.svg'},
    {name: 'Settings', url: '', imageUrl: '../../../../assets/feather/settings.svg'},
    {name: 'Logout', url: 'onLogout()', imageUrl: '../../../../assets/feather/log-out.svg'},
]