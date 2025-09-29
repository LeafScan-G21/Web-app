import React from 'react'
import { ChevronLeft } from 'lucide-react'
const PlantCard = ({plant, index}) => {
  return (
    <div key={`${plant.name}-${index}`} className="w-80 bg-white rounded-lg shadow-xl overflow-hidden flex-shrink-0">
        <div className="relative h-64">
            <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover"
            />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-3xl font-bold mb-2">
                        {plant.name}
                    </h3>
                    <p className="text-white text-sm">
                        {plant.description}
                    </p>
                </div>
            </div>
        </div>
  )
}

export default PlantCard