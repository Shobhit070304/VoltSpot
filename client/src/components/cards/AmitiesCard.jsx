import React, { memo } from "react";
import { Coffee, ShoppingBag, Wifi, MapPin, Clock } from "lucide-react";

const amenityIcons = {
  Cafe: Coffee,
  Shopping: ShoppingBag,
  WiFi: Wifi,
  Restroom: Clock,
  Parking: MapPin,
};

function AmenitiesCard({ amenities }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-orange-100 shadow-md overflow-hidden">
      <div className="px-6 py-5 border-b border-orange-100">
        <h2 className="text-lg font-semibold text-gray-900">
          Amenities Nearby
        </h2>
      </div>
      <div className="px-6 py-5">
        <div className="grid grid-cols-2 gap-4">
          {amenities.length > 0 ? (
            amenities?.map((amenity) => {
              const Icon = amenityIcons[amenity] || null;
              return (
                <div key={amenity} className="flex items-center">
                    {Icon && <Icon className="h-4 w-4 text-orange-500" />}
                    <span className="ml-3 text-sm text-gray-700">{amenity}</span>
                  </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center text-gray-500">
              No amenities available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(AmenitiesCard);
