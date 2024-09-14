import { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Button,
  Typography,
  useMediaQuery,
  Tooltip,
} from '@mui/material'
import Close from '@mui/icons-material/Close'
import { Menu, DojoLogoTextWhite } from '../assets'
import { useWallet } from '@solana/wallet-adapter-react'
import WalletModal from './WalletModal'
import { shortenSolanaAddress } from '../utils'

const drawerWidth = '100%'

const navItems = [
  {
    name: 'Home',
    activeFontColor: '#FFFFFF',
    fontWeight: 500,
    fontSize: '18px',
    activeFontFamily: 'Inter',
    fontFamily: 'Inter',
    id: 'home',
  },
  {
    name: 'About NexusAI',
    activeFontColor: '#FFFFFF',
    fontWeight: 500,
    fontSize: '18px',
    activeFontFamily: 'Inter',
    fontFamily: 'Inter',
    id: 'aboutNexusAI',
    showComingSoon: true,
  },
  {
    name: 'Products',
    activeFontColor: '#FFFFFF',
    fontWeight: 500,
    fontSize: '18px',
    activeFontFamily: 'Inter',
    fontFamily: 'Inter',
    id: 'products',
    showComingSoon: true,
  },
  {
    name: 'Token',
    activeFontColor: '#FFFFFF',
    fontWeight: 500,
    fontSize: '18px',
    activeFontFamily: 'Inter',
    fontFamily: 'Inter',
    id: 'token',
    showComingSoon: true,
  },
  {
    name: 'Docs',
    activeFontColor: '#FFFFFF',
    fontWeight: 500,
    fontSize: '18px',
    activeFontFamily: 'Inter',
    fontFamily: 'Inter',
    id: 'docs',
    showComingSoon: false,
  },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('home')
  const isDown1000 = useMediaQuery('(max-width:1000px)')
  const isDown1150 = useMediaQuery('(max-width:1150px)')
  const isDown600 = useMediaQuery('(max-width:600px)')
  const isDown350 = useMediaQuery('(max-width:350px)')

  const { publicKey, disconnect } = useWallet()
  console.log('navbar', publicKey?.toBase58())

  const [walletModal, setWalletModal] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavItemClick = (itemName: string, itemId: string) => {
    setActiveItem(itemId)

    // const element = document.getElementById(itemId);
    // if (element) {
    //   element.scrollIntoView({ behavior: "smooth" });
    // }

    if (isDown1000) {
      setMobileOpen(false)
    }
  }

  useEffect(() => {
    if (publicKey) {
      setWalletModal(false)
    }
  }, [publicKey])

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        marginTop: '16px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '16px',
          top: '16px',
        }}
      >
        <img
          src={DojoLogoTextWhite}
          alt='Logo'
          style={{
            height: isDown1000 ? '30px' : '85px',
            maxWidth: isDown1000 ? '120px' : '150px',
          }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          right: '16px',
          top: '16px',
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <Close sx={{ color: '#ffffff' }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '1px',
          backgroundColor: '#282828',
          position: 'absolute',
          top: '0px',
        }}
      />
      <List>
        {navItems.map(item => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'left',
                paddingLeft: '10%',
                paddingY: '30px',
                gap: '4px',
                justifyContent: isDown1000 ? 'center' : 'flex-start',
                borderBottom: '1px solid #282828',
                marginX: '16px',
              }}
              onClick={e => {
                e.stopPropagation()
                if(item.name === 'Docs'){
                  console.log("item.name", item.name)
                  window.open("https://dojo-protocol.gitbook.io/dojo-protocol", "_blank")

                }
                item.name === 'Home' && handleNavItemClick(item.name, item.id)
              }}
            >
              <Tooltip
                title={item.showComingSoon ? 'Coming Soon' : ''}
                placement='top'
                enterTouchDelay={0}
              >
                <Typography
                  fontSize={'18px'}
                  fontWeight={500}
                  lineHeight={'21px'}
                  fontFamily='Inter'
                  color={
                    activeItem === item.name
                      ? 'rgba(134, 60, 255, 1)'
                      : '#FFFFFF'
                  }
                >
                  {item.name}
                </Typography>
              </Tooltip>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        width: 'calc(100% - 8px)',
        height: '85px',
        alignItems: 'center',
        maxWidth: '100%',
      }}
    >
      <AppBar
        component='nav'
        sx={{
          background: 'rgba(0, 0, 0, 0.8)',
          boxShadow: 'none',
          width: '100%',
          paddingRight: isDown600 ? '20px' : '4%',
          paddingLeft: isDown600 ? '20px' : '4%',
        }}
        position='fixed'
      >
        <Toolbar sx={{ px: '0px !important', gap: '6px' }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { md: 'block' },
              WebkitWritingMode: 'vertical-lr',
            }}
          >
            <img
              src={DojoLogoTextWhite}
              alt='Logo'
              style={{
                height: '48px',
                maxWidth: isDown350 ? '90px' : isDown1000 ? '135px' : '196px',
                cursor: 'pointer',
                display: mobileOpen ? 'none' : 'flex',
              }}
              onClick={() => window.location.replace('/')}
            />
          </Box>
          <Box
            sx={{
              display: isDown1000 ? 'none' : 'flex',
              gap: isDown1150 ? '30px' : '56px',
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
          >
            {navItems.map(item => (
              <Button
                key={item.name}
                // onClick={() => {
                //   !item.showComingSoon && handleNavItemClick(item.name, item.id)
                // }}
                onClick={e => {
                  e.stopPropagation()
                  if(item.name === 'Docs'){
                    console.log("item.name", item.name)
                    window.open("https://dojo-protocol.gitbook.io/dojo-protocol", "_blank")
  
                  }
                  item.name === 'Home' && handleNavItemClick(item.name, item.id)
                }}
                sx={{
                  textTransform:
                    !item.showComingSoon && activeItem === item.id
                      ? 'Uppercase'
                      : 'none',
                  padding: 0,
                  cursor: 'pointer',
                  minWidth: '50px',
                }}
                disableRipple
              >
                <Tooltip
                  title={item.showComingSoon ? 'Coming Soon' : ''}
                  placement='top'
                  enterTouchDelay={0}
                >
                  <Typography
                    fontSize={'18px'}
                    fontWeight={500}
                    lineHeight={'21px'}
                    fontFamily='Inter'
                    color={
                      activeItem === item.id
                        ? '#FFFFFF'
                        : 'rgba(217, 217, 217, 0.5)'
                    }
                  >
                    {item.name}
                  </Typography>
                </Tooltip>
              </Button>
            ))}
          </Box>
          <Box
            sx={
              {
                // marginRight: isDown1000 ? '10px' : '0px',
                // marginLeft: isDown600 ? '10px' : '64px',
              }
            }
          >
            {!publicKey ? (
              <Button
                variant='contained'
                sx={{
                  width: '200px',
                  outline: 'none',
                  boxShadow: 'none',
                  border: isDown600 ? '1px solid rgba(40, 40, 43, 1)' : 'none',
                  borderRadius: '60px',
                  fontSize: '24px',
                  overflow: 'hidden',
                  background: 'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)',
                  // background: isDown1000
                  //   ? '#000000'
                  //   : 'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)',
                  height: isDown600 ? '33px' : '49px',
                  maxWidth: '216px',
                  // minWidth: 'max-content',
                  marginLeft: isDown600 ? '0px' : '64px',
                  '&:hover': {
                    opacity: 0.9,
                    backgroundColor: '#72AFF2',
                  },
                  '&:disabled': {
                    backgroundColor: '#72AFF2',
                  },
                }}
                onClick={() => setWalletModal(true)}
              >
                <Typography
                  fontSize={isDown600 ? '14px' : '20px'}
                  fontWeight={400}
                  lineHeight={'20px'}
                  fontFamily={'Biryani'}
                  color='#ffffff'
                  textTransform={'none'}
                  paddingTop={isDown600 ? '4px' : '4px'}
                >
                  Connect Wallet
                </Typography>
              </Button>
            ) : (
              <Button
              sx={{
                width: '200px',
                outline: 'none',
                boxShadow: 'none',
                border: isDown1000 ? '1px solid rgba(40, 40, 43, 1)' : 'none',
                borderRadius: '60px',
                fontSize: '24px',
                overflow: 'hidden',
                background: isDown1000
                  ? '#000000'
                  : 'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)',
                height: isDown1000 ? '33px' : '49px',
                // maxWidth: '216px',
                minWidth: 'max-content',
                marginLeft: isDown600 ? '0px' : '64px',
                '&:hover': {
                  opacity: 0.9,
                  backgroundColor: '#72AFF2',
                },
                '&:disabled': {
                  backgroundColor: '#72AFF2',
                },
              }}
                onClick={() => disconnect()}
              >
                <Typography
                  fontSize={isDown1000 ? '14px' : '20px'}
                  fontWeight={500}
                  lineHeight={'24px'}
                  fontFamily={'Biryani'}
                  color='rgba(255, 255, 255, 1)'
                  textTransform={'none'}
                >
                  {shortenSolanaAddress(publicKey?.toBase58() ?? '')}
                </Typography>
              </Button>
            )}
          </Box>

          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
            sx={{
              display: isDown1000 ? 'block' : 'none',
              visibility: mobileOpen ? 'hidden' : 'visible',
            }}
          >
            <img
              src={Menu}
              alt='Menu'
              style={{ width: '24px', height: '24px' }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component='nav'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor='right'
          ModalProps={{
            keepMounted: true,
          }}
          disableRestoreFocus
          sx={{
            display: { sm: 'block', md: 'block', lg: 'none' },
            zIndex: 2,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              zIndex: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              backgroundImage: 'none',
              backdropFilter: 'blur(4px)',
              justifyContent: 'center',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <WalletModal open={walletModal} setOpen={setWalletModal} />
    </Box>
  )
}

export default Navbar
