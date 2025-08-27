import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faUser,
    faSearch,
    faEdit,
    faTrash,
    faPlus,
    faCheck,
    faTimes,
    faEye,
    faEyeSlash,
    faCog,
    faSignOutAlt,
    faHome,
    faList,
    faChartBar,
    faUsers,
    faUserShield,
    faUserCheck,
    faUserTimes
} from '@fortawesome/free-solid-svg-icons';
import {
    faUser as faUserRegular,
    faEdit as faEditRegular,
    faTrashCan as faTrashCanRegular
} from '@fortawesome/free-regular-svg-icons';

// アイコンライブラリにアイコンを追加
library.add(
    // Solid icons
    faUser, faSearch, faEdit, faTrash, faPlus, faCheck, faTimes,
    faEye, faEyeSlash, faCog, faSignOutAlt, faHome, faList,
    faChartBar, faUsers, faUserShield, faUserCheck, faUserTimes,
    // Regular icons
    faUserRegular, faEditRegular, faTrashCanRegular
);
