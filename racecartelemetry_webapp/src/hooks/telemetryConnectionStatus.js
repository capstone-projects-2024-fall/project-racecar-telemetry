// @hooks/telemetryConnectedStatus

import { useEffect, useState, useRef } from "react"
import { ref, onValue } from "firebase/database"
import { db } from "@firebaseConfig"

const telemetryConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const connectedRef = ref(db, "data")

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      const currentData = snapshot.val()

      if (currentData) {
        setIsConnected(true)

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          setIsConnected(false)
        }, 2000)
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

export default telemetryConnectionStatus
