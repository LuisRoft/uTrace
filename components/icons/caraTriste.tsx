import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { FaceProps } from '@/types/FacesType';

export default function CaraTriste({ width = 210, height = 297 }: FaceProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 210 297">
      <G id="layer1">
        <G
          id="g3-1"
          transform="matrix(1.5525683,0,0,1.5525683,-354.82849,-198.15905)"
          style={{ strokeWidth: 0.465, strokeDasharray: 'none' }}
        >
          <Path
            fill="#4b72fe"
            fillOpacity={1}
            stroke="#031322"
            strokeWidth={0.465}
            strokeOpacity={0}
            d="M 290.57054 160.85666 C 266.08341 163.62236 243.85792 185.83779 234.96316 208.40685 C 228.33945 223.51495 229.11277 243.48151 237.23746 257.8439 C 247.94669 276.79853 269.89393 292.16028 291.58053 294.07263 C 314.41892 296.08653 342.48805 285.98817 354.6034 266.52371 C 367.84517 245.24955 364.75332 212.50612 351.2069 191.42461 C 339.13283 172.63434 313.77447 158.35991 291.58048 160.85663 Z"
          />
          <Path
            fill="#000000"
            fillOpacity={1}
            stroke="#031322"
            strokeWidth={0.465}
            d="M 270.75795 179.72578 C 271.8135 175.80876 279.47922 176.06035 279.81513 180.10316 C 280.78544 191.78124 282.84181 204.87522 283.05819 219.73329 C 283.27288 234.47603 283.79255 238.15398 283.96634 253.69274 C 283.99964 257.02667 275.25151 257.12054 273.96571 253.88143 C 271.5798 241.43541 271.48199 227.14974 270.48767 215.21473 C 269.61636 199.51645 268.29668 188.85976 270.75795 179.72578 Z"
          />
          <Path
            fill="#000000"
            fillOpacity={1}
            stroke="#031322"
            strokeWidth={0.465}
            d="M 318.38328 176.08013 C 319.43878 172.16311 327.10455 172.4147 327.44046 176.45751 C 328.41077 188.13559 330.46714 201.22947 330.68351 216.08765 C 330.90821 230.83039 331.41787 234.50834 331.59166 250.04709 C 331.62496 253.38102 322.87683 253.47489 321.59104 253.23578 C 319.20513 240.78977 318.10731 227.5041 317.11301 214.56908 C 316.24169 198.87081 314.92201 188.21412 318.38328 176.08013 Z"
          />
          <Path
            fill="#000000"
            fillOpacity={1}
            stroke="#031322"
            strokeWidth={0.197616}
            d="M 354.40585 265.39391 C 351.40645 274.82344 335.77395 257.76813 325.90104 257.10601 C 308.52473 255.94068 290.33072 258.20941 274.23411 264.86317 C 265.9804 268.27188 258.10797 287.81058 252.65515 280.73882 C 247.01031 273.41805 265.77378 267.04856 274.22979 263.31311 C 290.06763 256.31672 308.32583 253.87081 325.56975 255.42083 C 335.68865 256.33721 357.48878 255.70175 354.40585 265.39391 Z"
          />
        </G>
      </G>
    </Svg>
  );
}