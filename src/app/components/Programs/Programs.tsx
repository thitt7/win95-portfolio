import React from 'react';

import Doom from "@components/Desktop/Doom";

const example = () => {
  return <Doom />
}

const programs = {
    neighborhood: {
      title: "Network Neighborhood",
      name: "neighborhood",
      body: "this is some example text",
      toolbar: "",
      icon: "w95_18.ico",
      type: "file",
      filename: "networkneighborhood.exe",
      permissions: "r"
    },
    drive: {
      title: "(C:)",
      name: "drive",
      body: "",
      toolbar: "",
      icon: "w95_9.ico",
      type: "folder",
      filename: "drive",
      permissions: "r",
      contents: []
    },
    cpanel: {
      title: "Control Panel",
      name: "cpanel",
      body: "",
      toolbar: "",
      icon: "w95_36.ico",
      type: "file",
      filename: "cpanel.exe",
      permissions: "r"
    },
    programs: {
      title: "Programs",
      name: "programs",
      body: "",
      toolbar: "",
      icon: "w95_37.ico",
      type: "folder",
      filename: "programs.exe",
      permissions: "r"
    },
    settings: {
      title: "Settings",
      name: "settings",
      body: "",
      toolbar: "",
      icon: "w95_22.ico",
      type: "file",
      filename: "settings.exe",
      permissions: "r"
    },
    folder: {
      title: "New Folder",
      name: "folder",
      body: "",
      toolbar: "",
      icon: "w95_4.ico",
      type: "folder",
      filename: "newfolder",
      permissions: "rw",
      contents: []
    },
    resume: {
      title: "Resume",
      name: "resume",
      id: "resume",
      body: "<iframe src='https://drive.google.com/file/d/1owymS8itDXYMDMaOwdRyKyOofAWjpu6j/preview#view=fitH' title='Resume' height='100%' width='100%' />",
      toolbar: "",
      icon: "document-0.ico",
      type: "file",
      filename: "resume.pdf",
      permissions: "r"
    },
    github: {
      title: "Github",
      name: "github",
      id: "github",
      body: "",
      toolbar: "<a href='https://github.com/thitt7' target='_blank'><button>My Profile</button></a>",
      icon: "github.png",
      type: "file",
      filename: "github.exe",
      permissions: "r"
    },
    linkedin: {
      title: "LinkedIn",
      name: "linkedin",
      id: "linkedin",
      body: "",
      toolbar: "<a href='https://www.linkedin.com/in/tristan-hitt/' target='_blank'><button>My Profile</button></a>",
      icon: "linkedin.png",
      type: "file",
      filename: "linkedin.exe",
      permissions: "r"
    },
    codepen: {
      title: "Codepen",
      name: "codepen",
      id: "codepen",
      body: "<iframe style='width: 100%;' scrolling='no' title='Windows 95 Borders' src='https://codepen.io/biscuitboy17/embed/PoVdbMR?default-tab=html%2Cresult&theme-id=dark' frameborder='no' loading='lazy' allowtransparency='true' allowfullscreen='true'></iframe>",
      toolbar: "<a href='https://codepen.io/biscuitboy17' target='_blank'><button>My Profile</button></a>",
      icon: "codepen-white.png",
      type: "file",
      filename: "codepen.exe",
      permissions: "r"
    },
    iexplorer: {
      title: "Internet Explorer",
      name: "iexplorer",
      id: "iexplorer",
      body: "",
      toolbar: "",
      icon: "iexplorer.ico",
      type: "file",
      filename: "iexplorer.exe",
      permissions: "r"
    },
    doom: {
      title: "Doom",
      name: "doom",
      id: "doom",
      body: example,
      toolbar: "",
      icon: "doomicon.png",
      type: "file",
      filename: "doom.exe",
      permissions: "r"
    }
  };


  export default programs;