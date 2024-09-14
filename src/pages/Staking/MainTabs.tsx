import { Box, Grid, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

interface IMainTabs {
  handleTabChange: (value: number) => void
  tab: number
}

const MainTabs: React.FC<IMainTabs> = ({ handleTabChange, tab }) => {
  const activeTabBorder = '0.5px solid rgba(255, 255, 255, 0.16)'
  const isDown1200 = useMediaQuery('(max-width:1200px)')
  const isDown410 = useMediaQuery('(max-width:410px)')
  const isDown350 = useMediaQuery('(max-width:350px)')

  return (
    <Box
      sx={{
        width: isDown1200 ? '100%' : '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
      }}
      my={isDown1200 ? '16px' : '24px'}
    >
      <Grid
        container
        height={'56px'}
        border={'1px solid rgba(40, 40, 43, 1)'}
        minWidth={'max-content'}
        sx={{
          flexFlow: 'nowrap',
          background: 'transparent',
          padding: '4px',
        }}
      >
        <Grid
          itemScope
          xs={6}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          onClick={() => handleTabChange(0)}
          sx={{
            cursor: 'pointer',
            padding: isDown410 ? '12px 10px 12px 10px' : '12px 24px 13px 24px',
            minWidth: 'fit-content',
            background:
              tab === 0
                ? 'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)'
                : 'none',
          }}
        >
          <Typography
            fontSize={isDown350 ? '12px' : '16px'}
            fontWeight={400}
            lineHeight={'24px'}
            fontFamily={'Bruno Ace'}
            color={
              tab === 0
                ? 'rgba(0, 0, 0, 1)'
                : tab === 1
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(255, 255, 255, 0.5)'
            }
          >
            Staking
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{
            cursor: 'pointer',
            padding: isDown410 ? '12px 10px 12px 10px' : '12px 24px 13px 24px',
            minWidth: 'fit-content',
            background:
              tab === 1
                ? 'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)'
                : 'none',
          }}
          onClick={() => handleTabChange(1)}
        >
          <Typography
            fontSize={isDown350 ? '12px' : '16px'}
            fontWeight={400}
            lineHeight={'24px'}
            fontFamily={'Bruno Ace'}
            color={
              tab === 1
                ? 'rgba(0, 0, 0, 1)'
                : tab === 0
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(255, 255, 255, 0.5)'
            }
          >
            DOJO GPU
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainTabs
