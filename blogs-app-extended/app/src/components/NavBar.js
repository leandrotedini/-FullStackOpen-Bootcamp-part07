import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import {
  Stack, Box, Flex, Spacer, Link, Text
} from '@chakra-ui/react'
import { NAVIGATION_LINKS } from '../utils/navigation_helper'
import NavMenu from './Menu/NavMenu'

const NavBar = () => {

  return(
    <>
      <Stack>
        <Flex minWidth='max-content'
          alignItems='center'
          gap='2' bg='green.500'
          color='white'
          px={8}
        >
          {NAVIGATION_LINKS.map( item =>
            <Box key={item.name} p='2'>
              <Link as={ReactRouterLink} to={item.url}>
                <Text fontSize='2xl'>
                  {item.name}
                </Text>
              </Link>
            </Box>
          )}
          <Spacer />
          <NavMenu/>
        </Flex>
      </Stack>
    </>
  )
}

export default NavBar