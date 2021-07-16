import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations/index';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {/* {communitys.map((followers) => {
          return (
            <li key={followers}>
              <a href={`https://github.com/${followers}.png`} target="_Blank">
                <img src={followers} alt="community friend" />
                <span>{followers}</span>
              </a>
            </li>
          )
        })} */}
      </ul>

    </ProfileRelationsBoxWrapper>
  )
}


export default function Home() {

  const [communitys, setCommunitys] = useState([]);
  const [communityName, setCommunityName] = useState('');
  const [communityImg, setCommunityImg] = useState('');

  const customId = "custom-id-yes";

  const githubUser = 'matheus98rocha';
  const favoritePerson = ['carduardo13', 'torvalds', 'marcusalves13', 'maykbrito'];

  const [followers, setFollowers] = useState([]);

  useEffect(() => {

    fetch('https://api.github.com/users/matheus98rocha/followers').then(resp => {

      return resp.json()

    }).then(gitDataFollowers => {

      setFollowers(gitDataFollowers);
      
    })

  }, [])


  function ProfileSidebar() {
    return (
      <Box>
        <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
        <hr />
        <p>
          <a className="boxLink" href={`https://github.com/${githubUser}`}>
            @{githubUser}
          </a>
        </p>
        <hr />
        <AlurakutProfileSidebarMenuDefault />
      </Box>
    )
  }

  function handleCreateCommunity(e) {
    e.preventDefault();

    const finalCommunity = {
      id: new Date(),
      title: communityName,
      image: communityImg
    }
    console.log(communitys);

    if (communitys.length >= 6) {
      toast.warning("Limite de comunidades.");
      return;
    }

    if (communityName.length === 0 || communityImg.length === 0) {

      toast.error("Ops... Algo deu errado, verifique os campos e tente novamente.", {
        toastId: customId,
      });
      return;

    }

    const refreshCommunity = [...communitys, finalCommunity];
    setCommunitys(refreshCommunity);
  }

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  onChange={e => setCommunityName(e.target.value)}
                />
              </div>

              <div>
                <input placeholder="Coloque uma url para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma url para usarmos de capa"
                  onChange={e => setCommunityImg(e.target.value)}
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBox title="Seguidores" items={followers} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communitys.length})
            </h2>
            <ul>
              {communitys.map((community) => {
                return (
                  <li key={community.key}>
                    <a href={`/users/${community.title}/`} target="_Blank">
                      <img src={community.image} alt="community friend" />
                      <span>{community.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({favoritePerson.length})
            </h2>
            <ul>
              {
                favoritePerson.map((person) => {
                  return (
                    <li key={person}>
                      <a href={`https://github.com/${person}/`} target="_Blank">
                        <img src={`https://github.com/${person}.png`} alt="community friend" />
                        <span>{person}</span>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidades
          </Box>
        </div>
      </MainGrid>
      <ToastContainer />
    </>
  )
}