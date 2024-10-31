// @hooks/telemetryConnectedStatus

import { useEffect, useState, useRef } from "react"
import { ref, onValue } from "firebase/database"
import { db } from "@firebaseConfig"

const telemetryConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(null)
  const previousDataRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const connectedRef = ref(db, "CANdata/001")

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      const currentData = snapshot.val()
      const currentDataString = JSON.stringify(currentData)

      if (previousDataRef.current === null) {
        previousDataRef.current = currentDataString
      }

      if (currentData && previousDataRef.current !== currentDataString) {
        setIsConnected(true)
        previousDataRef.current = currentDataString

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          setIsConnected(false)
        }, 5000)
      } else {
        setIsConnected(false)
      }
    })

    return () => {
      unsubscribe()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return isConnected
}

export default telemetryConnectionStatus
