import React, { useRef, useEffect } from "react";
import { View, requireNativeComponent } from "react-native";

const SkiaLineChart = requireNativeComponent("SkiaLineChart");

const Charts = ({ data }) => {
  const skiaRef = useRef();

  useEffect(() => {
    if (skiaRef.current) {
      // Use Skia canvas methods to draw the line chart
      const canvas = skiaRef.current.getCanvas();

      // Example: Draw a simple line
      const paint = new skia.Paint();
      paint.setColor(skia.Color(255, 0, 0)); // Red color
      paint.setStrokeWidth(2);

      canvas.drawLine(50, 50, 250, 250, paint);
    }
  }, [data]);

  return (
    <View>
      <SkiaLineChart ref={skiaRef} style={{ flex: 1 }} />
    </View>
  );
};

export default Charts;
