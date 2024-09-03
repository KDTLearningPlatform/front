import React from 'react';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as MyCoursesIcon } from '../../assets/icons/courses.svg';
import { ReactComponent as CommunityIcon } from '../../assets/icons/community.svg';
import { ReactComponent as RankingIcon } from '../../assets/icons/ranking.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';

const navList = [
  {
    name: '홈',
    path: '/main',
    img: <HomeIcon />,
  },
  {
    name: '내 강의들',
    path: '/my-courses',
    img: <MyCoursesIcon />,
  },
  {
    name: '커뮤니티',
    path: '/community',
    img: <CommunityIcon />,
  },
  {
    name: '랭킹',
    path: '/ranking',
    img: <RankingIcon />,
  },
  {
    name: '프로필',
    path: '/profile',
    img: <ProfileIcon />,
  },
];

export default navList;
