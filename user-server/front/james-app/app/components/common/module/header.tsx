'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LinkButton, { linkButtonTitles } from '@/app/atoms/button/LinkButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroyCookie, parseCookies } from 'nookies';
import { findLogout, findUserById} from '../../user/service/user-service';
import { getUserById } from '../../user/service/user-slice';
import { jwtDecode } from 'jwt-decode';


function Header() {
  const router = useRouter();
  const dispatch = useDispatch()
  const userInfo=useSelector(getUserById);
  let token:string|null=null;

  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    console.log('현재 쿠키: '+parseCookies().accessToken);
    console.log('현재 토큰: '+ token);
    if (parseCookies().accessToken) {
      setShowProfile(true)
      console.log('showProfile:true');
      token=parseCookies().accessToken;
      console.log('쿠키 => 토큰: '+ token);
      token? dispatch(findUserById(jwtDecode<any>(token).userId)): router.push('/');
    } else {
      console.log('showProfile:false');
      setShowProfile(false)
    }
  }, [])

  const logoutHandler = () => {
    console.log('로그아웃 적용 전 : ' + parseCookies().accessToken)
    dispatch(findLogout())
      .then((res: any) => {
        destroyCookie(null, 'accessToken') // 로그아웃이 성공하면 삭제
        console.log('destroy 쿠기 후: '+parseCookies().accessToken);
        setShowProfile(false)
        token=null;
        router.push('/');
      })
      .catch((err: any) => {
        console.log('로그아웃 실행에서 에러가 발생함 : ' +err)
      }).finally(()=>{
        router.refresh();
      })
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Home</span>
        </Link>
        {!showProfile && <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full" src="/public/img/people/profile.jpg" alt="user photo" />
        </button>}
        {showProfile &&
          <div className="flex px-4 py-3 float-end">
            <span className="block text-sm text-gray-900 dark:text-white">{userInfo.name}</span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 mx-5">{userInfo.username}@flowbite.com</span>
            <span 
             className="block text-sm  text-gray-500 truncate dark:text-gray-400"
             onClick={logoutHandler}><Link href="#">Logout</Link></span>
          </div>
        }
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

            {linkButtonTitles.map((elem) => (
                <LinkButton key={elem.id} id={elem.id} title={elem.title} path={elem.path} />
            ))}
          </ul>
        </div>
      </div>
    </nav>

  );
}
export default Header;
