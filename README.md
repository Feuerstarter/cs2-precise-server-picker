# CS2 Precise Server Picker
#### Automatically receives an up-to-date list of all official CS2 servers, checks the ping to each of them (including each specific one within a country) and blocks all servers with a ping higher than specified using a Windows Firewall. 

Requires [Node.js](https://nodejs.org/) installed to work, ~10 seconds to finish.

Comparing to CS2 Server Picker, this tool allows you to block not all servers in a particular country, but specifically those that are bad with your specific internet provider (ping to each specific server in one city may differ due to routing), leaving suitable ones. Unlike mm_dedicated_search_maxping console command, this tool really blocks all unacceptable servers and gives ability to filter by any selected ping value down to 1ms.

it is preferable to rerun the tool (delete firewall rule then ping and create new rule) on a daily basis.

[Download](https://github.com/Feuerstarter/cs2-precise-server-picker/releases/download/1.0.1/cs2-precise-server-picker.zip) (unzip before using)

## Usage
### config.js
Could be edited to configure desired maximum ping (maxPing, default = 25), number of ping attempts (pingRetries, default = 4) and ping timeout (pingTimeout, in seconds, default = 1).

![image](https://github.com/user-attachments/assets/37beb164-a0ef-4ac3-aa69-f034f54c1877)


### ping_and_create_firewall_rule.bat
Will do all the work (block "bad" servers) and output the result to the console step by step.
After launching, it will ask for admin rights.

![image](https://github.com/user-attachments/assets/081d5eb9-b92b-4114-a82d-a913540f3600)


### delete_firewall_rule.bat
Will delete previously created firewall rule (unblock servers).
After launching, it will ask for admin rights.

![image](https://github.com/user-attachments/assets/e3d0af02-a920-4bcb-915b-54ad7abe2a41)


### ping.bat
Will check ping and output specific servers (ip, country, ping result) meeting condition (maxPing from config.js) only. Does not require admin rights.

![image](https://github.com/user-attachments/assets/b7b66461-4ec4-440a-886a-8faf216d6caa)
