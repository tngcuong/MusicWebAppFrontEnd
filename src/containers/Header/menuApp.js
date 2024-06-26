export const adminMenu = [
    { //hệ thống
        name: 'menu.system.header',
        menus: [
            {
                name: 'menu.system.system-administrator.header',
                subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.system.system-administrator.song-manage', link: '/system/song-manage' },
                ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            {
                name: 'menu.system.staticst.header',
                subMenus: [
                    { name: 'menu.system.staticst.staticst-by-user', link: '/system/staticst/user' },
                    { name: 'menu.system.staticst.staticst-by-listen', link: '/system/staticst/listen' },
                ]
            }
        ]
    },
];