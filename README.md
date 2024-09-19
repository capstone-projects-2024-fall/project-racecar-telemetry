[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15801646)

<div align="center">

# Racecar Telemetry
[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://applebaumian.github.io/tu-cis-4398-docs-template/)


</div>


## Keywords

Section 002, Racecar telemetry, embedded systems (ESP32), wireless networks, server-client programming, web application development

## Project Abstract

This document proposes a wireless vehicle telemetry system to transmit real-time data from a Formula-style racecar to devices off the track. The system will allow racing teams to view important sensor and diagnostic information - e.g., RPM, lap times, engine temperature - on their devices while up to 500 meters away. Having live data will help to facilitate assessment of driver and vehicle performance on dynamic testing days, preserve engine health through live diagnostics, and promote a deeper team-wide understanding of the vehicle.

One side of the proposed system is the mobile component, consisting of the hardware embedded into the vehicle’s wiring (primarily a microcontroller and wireless internet service provider) and the software to run the server side of the system. The client side consists of devices that connect to the vehicle’s network to display data in a webpage. The final product is a web page that enables users to view live racecar data in the form of customizable widgets for graphs, gauges, and warnings. 

This project is intended for use in Temple Formula Racing’s (TFR) vehicle, which competes in the Formula Society of Automotive Engineers (FSAE) competition. In this competition, university teams are challenged to design, fabricate, and race formula-style vehicles.

## High Level Requirement

Users (spectators or team members at a TFR event) will use laptops or phones to connect to the vehicle telemetry system’s wireless network. They will navigate to a web page which will automatically populate with data sent from the vehicle and update in real time. The user can select which data channels are shown and in what format through the use of widgets (for example, a vehicle speed vs. time graph). This web page should feel like a customizable vehicle dashboard. Additionally, the user will be able to select values for which a warning will appear (e.g., a popup if engine temperature exceeds 220° F).

## Conceptual Design

System architecture (see system diagram for details):

1. CAN (Controller Area Network) transceiver - converts vehicle communication bus signal into something readable by the microprocessor
2. Microprocessor - responsible for processing vehicle data, running web server, transmitting server data to wireless gateway via Ethernet. Will use Arduino IDE with C-like programming language to program server back end. 
3. Wireless gateway - transmits server data to base over the desired range
4. Power over Ethernet injector - converts vehicle’s DC power supply to something usable by Wireless Gateway

## Background

The background will contain a more detailed description of the product and a comparison to existing similar projects/products. A literature search should be conducted and the results listed. Proper citation of sources is required. If there are similar open-source products, you should state whether existing source will be used and to what extent. If there are similar closed-source/proprietary products, you should state how the proposed product will be similar and different.

## Required Resources

Hardware requirements (subject to change based on instructor review):
- CAN Transceiver (2x): SN65HVD23x ($2)
- Microprocessor: ESP32-ETHERNET-KIT-VE ($55)
- Wireless Transmitter: Ubiquity UniFi Access Point AC Mesh ($99)
- POE (Power over Ethernet) Injector: Tycon Gigabit HP PoE Inserter/Splitter ($14.25)
- Second microprocessor (for test bench): ESP32 ($10)
- Additional electrical hardware, such as connectors, jumper wires, ethernet cables (\<$50)

Total proposed cost: \<$230.25

Knowledge Requirements
- The software architecture, specifically server-client interaction, requires elaboration before the project can proceed. 
- We will consult Temple Electrical Engineering faculty throughout the semester for advice and theoretical background. 
- For additional background, members of the Capstone team can contact other FSAE teams who have successfully implemented telemetry systems.

The system will be bench tested using simulated vehicle serial communication. This is how the final product will be presented.

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
