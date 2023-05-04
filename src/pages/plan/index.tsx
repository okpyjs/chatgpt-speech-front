import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { SiHive, SiMarketo, SiMicrosoft } from 'react-icons/si'
import { PricingCard } from './PricingCard'
import { ActionButton } from './ActionButton'

export const Plan = () => (
  <Box
    as="section"
    // bg={useColorModeValue('gray.50', 'gray.800')}
    py="14"
    px={{ base: '4', md: '8' }}
  >
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: '8', lg: '0' }}
      maxW="7xl"
      mx="auto"
      justifyItems="center"
      alignItems="center"
    >
      <PricingCard
        data={{
          price:  '¥0',
          name: '無料',
          features: [
            '1 日あたり 5 件のリクエスト',
            // 'Lifetime access',
            // 'Use on unlimited projects',
            // 'Free Updates',
          ],
        }}
        icon={SiMicrosoft}
        button={
          <ActionButton variant="outline" borderWidth="2px" disabled={true}>
            今すぐ購入
          </ActionButton>
        }
      />
      <PricingCard
        zIndex={1}
        isPopular
        // transform={{ lg: 'scale(1.05)' }}
        data={{
          price: '¥49',
          name: 'プロ',
          features: [
            '1 日あたり 200 件のリクエスト',
            // 'Lifetime access',
            // 'Use on unlimited projects',
            // 'Use on unlimited projects',
            // 'Free Updates',
          ],
        }}
        icon={SiHive}
        button={<ActionButton>今すぐ購入</ActionButton>}
      />
      {/* <PricingCard
        data={{
          price: '$29',
          name: 'Marketing UI',
          features: [
            // 'All application UI components',
            // 'Lifetime access',
            // 'Use on unlimited projects',
            // 'Free Updates',
          ],
        }}
        icon={SiMarketo}
        button={
          <ActionButton variant="outline" borderWidth="2px">
            今すぐ購入
          </ActionButton>
        }
      /> */}
    </SimpleGrid>
  </Box>
)