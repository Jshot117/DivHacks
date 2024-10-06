import subprocess
import json
from pathlib import Path

districts = [district["properties"]["AssemDist"] for district in json.loads(Path("../district_boundaries.geojson").read_text())["features"]]

# print(districts)

missed = []

for i in districts:
    # subprocess.run(["wget", f"https://raw.githubusercontent.com/NewYorkCityCouncil/districts/master/thumbnails/district-{i}.jpg"])
    url = f"https://nyassembly.gov/write/upload/member_files/{i:0>3}/header_headshot/{i:0>3}.png"
    path = f"district-{i}.png"
    subprocess.run(["wget", url, "-O", path])
    if not Path(path).exists():
        missed.append(path)

print(missed)