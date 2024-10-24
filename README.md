[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15801646)

<div align="center">

# Racecar Telemetry
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://applebaumian.github.io/tu-cis-4398-docs-template/)


</div>

## running the web app
 - cd into `racecartelemetry_webapp`
 - run `npm i` and wait for installation to complete
 - run `npm run dev` to run the website on localhost


## Keywords

Section 002, Racecar telemetry, embedded systems (ESP32), wireless networks, server-client programming, web application development

## Project Abstract

This document proposes a wireless vehicle telemetry system to transmit real-time data from a Formula-style racecar to a website for devices off the track to view. The system will allow racing teams to view important sensor and diagnostic information - e.g., RPM, lap times, engine temperature - on their devices, no matter where they are. Having live data will help to facilitate assessment of driver and vehicle performance on dynamic testing days, preserve engine health through live diagnostics, and promote a deeper team-wide understanding of the vehicle.

One side of the proposed system is the mobile hardware component, consisting of the hardware embedded into the vehicle’s wiring and a smartphone that provides mobile hotspot, and the software to run the server side of the system. On the other side is the software component, consisting of a hosted website and database. The final product is a web page that enables users to view live racecar data in the form of customizable widgets for graphs, gauges, and configuration for different CAN messages setups.

This project is intended for use in Temple Formula Racing’s (TFR) vehicle, which competes in the Formula Society of Automotive Engineers (FSAE) competition. In this competition, university teams are challenged to design, fabricate, and race formula-style vehicles.

## High Level Requirement

Users (spectators or team members at a TFR event) will use laptops or phones to visit the website. The web page which will automatically populate with data sent from the vehicle and update in real time. The user can select which data channels are shown and in what format through the use of widgets (for example, a vehicle speed vs. time graph). This web page should feel like a customizable vehicle dashboard. Additionally, the user can remotely match how their CAN system encodes CAN messages to make sure that the decoded CAN Message is accurate. 

## Conceptual Design

System architecture (see system diagram for details):

1. CAN (Controller Area Network) transceiver - converts vehicle communication bus signal into something readable by the microprocessor
2. Microprocessor - responsible for processing vehicle data and uploading to database over WiFi. 
3. Mobile Hotspot - a cell phone with moblie hotspot is in the car to provide WiFi to the ESP32 while driving. 
4. Database - a Firebase database is used to store live data (CAN IDs and messages)
5. Website - a website pulls data from the database to display live in a customizeable dashboard.

## Background

Commercially available wireless motorsport telemetry exists (for example, MoTeC T2 or Bosch Telemetry System FM 40), but the price tag makes it inaccessible to many FSAE teams. This project’s custom framework and relatively low cost make it ideal for implementation in a student-run racing team. This project architecture is based heavily on the systems outlined in articles by other university teams, including the Swiss Federal Institute of Technology Zurich and California Polytechnic Institute. Additionally, documentation for ESP32 server-side events was consulted. 

## Required Resources

<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRPmqrR1D0rSadeonzcJYDSI9_54YGbKhxfEFePVx_G_DNKT3bhswWF8M95XYecuXjWSqct2AxIOJHy/pubhtml?widget=true&amp;headers=false" frameborder="0" width="80%" height="500"></iframe>

Knowledge Requirements
- The software architecture, specifically server-client interaction, requires elaboration before the project can proceed. 
- We will consult Temple Electrical Engineering faculty throughout the semester for advice and theoretical background. 
- For additional background, members of the Capstone team can contact other FSAE teams who have successfully implemented telemetry systems.

The system will be bench tested using simulated vehicle serial communication. This is how the final product will be presented.

Useful links:

Braune, Nils. Telemetry Unit for a Formula Student Race Car. 2014.

Rounds, Matt. Formula SAE Telemetry System. 

Random Nerd Tutorials. ESP32 Web Server using Server-Sent Events (Update Sensor Readings Automatically). 

Rua Copeto, David. Automotive data acquisition system - FST. 2009.

Yi Tan, Frank. Development of Electric Formula SAE Real-time Telemetry Software. 

## Collaborators

[//]: # ( readme: collaborators -start )
<table>
<tr>
    <td align="center">
        <a href="https://github.com/ApplebaumIan">
            <img src="https://avatars.githubusercontent.com/u/9451941?v=4" width="100;" alt="ApplebaumIan"/>
            <br />
            <sub><b>Ian Tyler Applebaum</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/NasierF">
            <img src="" width="100;" alt="Nasier"/>
            <br />
            <sub><b>Nasier Fowlkes</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/WJ2K">
            <img src="" width="100;" alt="Jacky"/>
            <br />
            <sub><b>WenJie (Jacky) Ke</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/arjunpatel5">
            <img src="" width="100;" alt="Arjun"/>
            <br />
            <sub><b>Arjun Patel</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/nick-pell">
            <img src="" width="100;" alt="Nick"/>
            <br />
            <sub><b>Nick Pell</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ajreisc">
            <img src="" width="100;" alt="Arianna"/>
            <br />
            <sub><b>Arianna Reischer</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/dennis-yeom">
            <img src="" width="100;" alt="Dennis"/>
            <br />
            <sub><b>Dennis Yeom</b></sub>
        </a>
    </td></tr>
</table>

[//]: # ( readme: collaborators -end )
