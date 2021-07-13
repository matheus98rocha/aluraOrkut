import styled from 'styled-components';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations/index';

export default function Home() {

  const githubUser = 'matheus98rocha';
  const favoritePerson = ['carduardo13', 'torvalds', 'marcusalves13', 'maykbrito'];

  function ProfileSidebar() {
    return (
      <Box>
        <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
      </Box>
    )
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
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePerson.length})
            </h2>
            <ul>
              {
                favoritePerson.map((person) => {
                  return (
                    <li>
                      <a href={`https://github.com/${person}/`} key={person} target="_Blank">
                        <img src={`https://github.com/${person}.png`} />
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