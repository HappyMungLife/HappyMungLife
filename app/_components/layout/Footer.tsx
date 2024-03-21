import React from 'react';
import Image from 'next/image';
import Logo from '@/public/images/logo.png';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="flex justify-between items-center size-full px-5 py-10  bg-secondaryColor">
      <h1>
        <Image className="w-28" src={Logo} alt="logo" />
      </h1>
      <div className="text-sm">
        <h2>강아지, 애견 장소 정보 중고거래나눔 커뮤니티</h2>
        <p>혁우님과 함께하면 참 10조 &copy;All rights reserved.</p>
      </div>
      <Link
        href="https://github.com/sparta-advancedProject-team10/HappyMungLife"
        target="_blank"
        className="block size-8 hover:text-primaryColor"
      >
        <FontAwesomeIcon className="size-8" icon={faGithub} />
      </Link>
    </footer>
  );
};

export default Footer;
