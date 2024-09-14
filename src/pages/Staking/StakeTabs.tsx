import React from 'react'
import { Box, Tab, Tabs, Typography, useMediaQuery } from '@mui/material'

interface IStakeTabs {
  handleTabChange: (value: number) => void
  tab: number
}

const StakeTabs: React.FC<IStakeTabs> = ({ handleTabChange, tab }) => {
  const isDown1200 = useMediaQuery('(max-width:1200px)')
  const isDown410 = useMediaQuery('(max-width:410px)')
  const isDown350 = useMediaQuery('(max-width:350px)')

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    handleTabChange(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label='stake tabs'
        variant='scrollable'
        scrollButtons='auto'
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          background: 'transparent',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          my: isDown1200 ? '16px' : '24px',
          mt: 0,
          width: '100%',
          display: 'flex',
          '.MuiTabs-flexContainer': {
            justifyContent: 'space-around',
          },
          '.MuiTabs-indicator': {
            backgroundColor: 'none',
            background: 'linear-gradient(273.02deg, #12FDA0 0%, #7730F5 100%)',
            mb: '2px',
            mx: '2px',
            borderRadius: '10px',
          },
        }}
      >
        <Tab
          label={
            <Typography
              fontSize={isDown350 ? '12px' : '16px'}
              fontWeight={400}
              lineHeight={'24px'}
              fontFamily={'Inter'}
              textTransform={'capitalize'}
              color={
                tab === 0 ? 'rgba(18, 253, 160, 1)' : 'rgba(255, 255, 255, 0.5)'
              }
            >
              Stake
            </Typography>
          }
          sx={{
            minWidth: 'fit-content',
            padding: '1px',
            cursor: 'pointer',
            width: '33.33%',
          }}
        />
        <Tab
          label={
            <Typography
              fontSize={isDown350 ? '12px' : '16px'}
              fontWeight={400}
              lineHeight={'24px'}
              fontFamily={'Inter'}
              textTransform={'capitalize'}
              color={
                tab === 1 ? 'rgba(18, 253, 160, 1)' : 'rgba(255, 255, 255, 0.5)'
              }
            >
              Reward
            </Typography>
          }
          sx={{
            minWidth: 'fit-content',
            padding: '1px',
            cursor: 'pointer',
            width: '33.33%',
          }}
        />
        <Tab
          label={
            <Typography
              fontSize={isDown350 ? '12px' : '16px'}
              fontWeight={400}
              lineHeight={'24px'}
              fontFamily={'Inter'}
              textTransform={'capitalize'}
              color={
                tab === 2 ? 'rgba(18, 253, 160, 1)' : 'rgba(255, 255, 255, 0.5)'
              }
            >
              Unstake
            </Typography>
          }
          sx={{
            minWidth: 'fit-content',
            padding: '1px',
            cursor: 'pointer',
            width: '33.33%',
          }}
        />
      </Tabs>
    </Box>
  )
}

export default StakeTabs
