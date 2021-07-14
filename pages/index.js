import styled from 'styled-components';
import React, { useState } from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations/index';

export default function Home() {

  const [communitys, setCommunitys] = useState([]);


  const githubUser = 'matheus98rocha';
  const favoritePerson = ['carduardo13', 'torvalds', 'marcusalves13', 'maykbrito'];

  function ProfileSidebar() {
    return (
      <Box>
        <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
        <hr />
        <p>
          <a class="boxLink" href={`https://github.com/${githubUser}`}>
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

    const dadosDoForm = new FormData(e.target);

    const finalCommunity = {
      id: new Date(),
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image')
    }
    console.log(communitys);


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
            <h2 class="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>


              <div>
                <input placeholder="Coloque uma url para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma url para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

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
    </>
  )
}