"use client";

import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface Country {
  id: string;
  name: string;
}

interface WorldMapProps {
  setSelectedCountry: (country: Country) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ setSelectedCountry }) => {
  useEffect(() => {
    // Create root element
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
      })
    );

    // Create main polygon series for countries
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonHover"),
    });

    polygonSeries.mapPolygons.template.states.create("active", {
      fill: root.interfaceColors.get("primaryButtonHover"),
    });

    // Create series for background fill
    let backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0.1,
      strokeOpacity: 0,
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    let graticuleSeries = chart.series.unshift(
      am5map.GraticuleSeries.new(root, {
        step: 10,
      })
    );

    graticuleSeries.mapLines.template.set("strokeOpacity", 0.1);

    // Set up events
    let previousPolygon: am5map.MapPolygon | undefined;

    polygonSeries.mapPolygons.template.on("active", function (active, target) {
      if (previousPolygon && previousPolygon != target) {
        previousPolygon.set("active", false);
      }
      if (target && target.get("active") && target.dataItem) {
        const countryId = (target.dataItem.dataContext as { id: string }).id;
        const countryName = (target.dataItem.dataContext as { name: string })
          .name;
        setSelectedCountry({ id: countryId, name: countryName });
        selectCountry(countryId);
      }
      previousPolygon = target;
    });

    function selectCountry(id: string) {
      let dataItem = polygonSeries.getDataItemById(id);
      let target = dataItem?.get("mapPolygon");
      if (dataItem && target) {
        let centroid = target.geoCentroid();
        if (centroid) {
          chart.animate({
            key: "rotationX",
            to: -centroid.longitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
          chart.animate({
            key: "rotationY",
            to: -centroid.latitude,
            duration: 1500,
            easing: am5.ease.inOut(am5.ease.cubic),
          });
        }
      }
    }

    // Make stuff animate on load
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "800px" }}></div>;
};

export default WorldMap;
