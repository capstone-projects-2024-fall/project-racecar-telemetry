// @hooks/telemetryConnectedStatus

import { useEffect, useState, useRef } from "react"
import { ref, onValue } from "firebase/database"
import { db } from "@firebaseConfig"

const useTelemetryConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const connectedRef = ref(db, "data")

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      const currentData = snapshot.val()

      if (currentData?.isConnected === true) {
        setIsConnected(true)

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          setIsConnected(false)
        }, 6000)
      } else {
        setIsConnected(false)
      }
    }
  );

    return () => {
      unsubscribe()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return isConnected
}

export default useTelemetryConnectionStatus
