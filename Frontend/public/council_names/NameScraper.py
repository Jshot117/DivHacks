import requests
import json
from bs4 import BeautifulSoup

url = 'https://nyassembly.gov/mem/?contact_msg_new=1#086'

r = requests.get(url)

assemblyMemberDict = {}
soup = BeautifulSoup(r.content, "html5lib")
member_sections = soup.find_all('section', attrs="mem-item")


#
for section in member_sections:
    name_tag = section.find('h3', class_='mem-name')
    district_tag = section.find('span')
    email_tag = section.find('a', href=lambda href: href and "mailto:" in href)
    address_tags = section.find_all('div', class_='mem-address')
    
    if name_tag:
        name = name_tag.get_text(strip=True)
    else:
        name = None
        
    if district_tag:
        district = district_tag.get_text(strip=True).split()[1]
    else:
        district = None
        
    if email_tag:
        email = email_tag.get_text(strip=True)
    else:
        email = None
       
    address_full = None
    if address_tags:
        address_parts = []
        for address_tag in address_tags:
            address_parts.extend(address_tag.stripped_strings)  # Add all the stripped strings from each div
        address_full = "\n".join(address_parts)  # Join them into a multi-line string
    else:
        address_full = None
    
    # Store data into the dictionary using district as the key
    assemblyMemberDict[district] = {
        'name': name,
        'email': email,
        "address_info": address_full
    }
with open('assembly_members.json', 'w') as json_file:
    json.dump(assemblyMemberDict,json_file, indent=4)


    
    