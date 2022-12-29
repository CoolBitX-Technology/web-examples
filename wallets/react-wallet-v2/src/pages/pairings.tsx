import PageHeader from '@/components/PageHeader'
import PairingCard from '@/components/PairingCard'
import { signClient } from '@/utils/WalletConnectUtil'
import { Text } from '@nextui-org/react'
import { getSdkError } from '@walletconnect/utils'
import { Fragment, useState } from 'react'

export default function PairingsPage() {
  const [pairings, setPairings] = useState(signClient.pairing.values)

  async function onDelete(topic: string) {
    console.log('click delete >> topic=', topic)
    // try {
    //   const pingResult = await signClient.ping({ topic })
    //   console.log('click delete >> ping result=', pingResult);
    // } catch (error) {
    //   console.log('click delete >> ping error=', error);
    // }

    await signClient.disconnect({ topic, reason: getSdkError('USER_DISCONNECTED') })
    console.log(
      'click delete >> disconnected signClient.pairing.values=',
      JSON.stringify(signClient.pairing.values, null, 2)
    )
    const newPairings = signClient.pairing.values
    setPairings(newPairings)
  }

  return (
    <Fragment>
      <PageHeader title="Pairings" />
      {pairings.length ? (
        pairings.map((pairing, index) => {
          const { peerMetadata } = pairing
          console.log(`pairings index=${index} pairing=${JSON.stringify(pairing, null, 2)}}`)
          return (
            <PairingCard
              key={pairing.topic}
              logo={peerMetadata?.icons[0]}
              url={peerMetadata?.url}
              name={peerMetadata?.name}
              onDelete={() => onDelete(pairing.topic)}
            />
          )
        })
      ) : (
        <Text css={{ opacity: '0.5', textAlign: 'center', marginTop: '$20' }}>No pairings</Text>
      )}
    </Fragment>
  )
}
