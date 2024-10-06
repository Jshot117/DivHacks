import * as d3 from "d3";

let districtsJson: any = undefined;

fetch("/district_boundaries.geojson").then(res => res.json()).then(dj => {
    districtsJson = dj;
    districtBoundaries = {};
    for (const district of dj.features) {
        districtBoundaries["" + district.properties.AssemDist] = district.geometry;
    }
});

export let districtBoundaries: { [district: string]: d3.GeoGeometryObjects } | undefined = undefined;

export function districtAtLocation(point: [number, number]): number | undefined {
    console.log(districtsJson?.features.map(e => e.geometry));
    return districtsJson?.features.find(e => d3.geoContains(e.geometry, point))?.properties?.AssemDist;
}