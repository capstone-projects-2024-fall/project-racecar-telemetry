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
      console.log(currentData)

      if (currentData) {
        const currentDataString = JSON.stringify(currentData)

        if (previousDataRef.current === null) {
          previousDataRef.current = currentDataString
        }

        if (previousDataRef.current !== currentDataString) {
          // New data detected, set to connected
          setIsConnected(true)

          // Update the previous data with the new data
          previousDataRef.current = currentDataString

          // Reset the disconnection timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }

          // Set a timeout to detect disconnection if no new data arrives
          timeoutRef.current = setTimeout(() => {
            setIsConnected(false) // Timeout expired, set to disconnected
          }, 5000) // Adjust the timeout duration as needed (5000 ms here)
        }
      } else {
        // No data present, set as disconnected
        setIsConnected(false)
      }
    })

    // Cleanup function
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
