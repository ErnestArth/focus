// handlers/vehicle.js

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connect';
// import Vehicle from '@/model/vehicle.model'; // Import your Vehicle model
import Warnings from '@/model/warnings.model';




// handlers/vehicles.js

export const GET = async (req: NextRequest,{params}:any) => {
    try {
        await connectToDB()
        const {macId}= params

        const metric = await Warnings.aggregate([
            {
                $match: { deviceId: macId } // Match the specific deviceId
              },
            {
              $group: {
                _id: { $month: "$timestamp" },
                totalWarnings: { $sum: "$warning" }
              }
            },
            {
              $sort: { "_id": 1 } // Sort by month
            },
            {
              $project: {
                _id: 0,
                month: {
                  $let: {
                    vars: {
                      monthsInString: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                    },
                    in: { $arrayElemAt: ["$$monthsInString", { $subtract: ["$_id", 1] }] }
                  }
                },
                fatigueRate: "$totalWarnings"
              }
            }
          ]);
      
        const now = new Date();
    
        // Define time intervals
        const lastHour = new Date(now.getTime() - 60 * 60 * 1000);
        const lastDay = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const lastTwoDays = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    
        const results = await Warnings.aggregate([
          {
            $match: {
              deviceId: macId,
              timestamp: {
                $gte: lastTwoDays,
              }
            }
          },
          {
            $facet: {
              lastHour: [
                {
                  $match: {
                    timestamp: { $gte: lastHour }
                  }
                },
                {
                  $group: {
                    _id: null,
                    averageWarnings: { $avg: "$warning" },
                    totalWarnings: { $sum: "$warning" }
                  }
                }
              ],
              lastDay: [
                {
                  $match: {
                    timestamp: { $gte: lastDay }
                  }
                },
                {
                  $group: {
                    _id: null,
                    averageWarnings: { $avg: "$warning" },
                    totalWarnings: { $sum: "$warning" }
                  }
                }
              ],
              previousDay: [
                {
                  $match: {
                    timestamp: { $gte: lastTwoDays, $lt: lastDay }
                  }
                },
                {
                  $group: {
                    _id: null,
                    averageWarnings: { $avg: "$warning" },
                    totalWarnings: { $sum: "$warning" }
                  }
                }
              ]
            }
          }
        ]);
    
        const lastHourAvg = results[0].lastHour.length > 0 ? results[0].lastHour[0].averageWarnings : 0;
        const lastDayAvg = results[0].lastDay.length > 0 ? results[0].lastDay[0].averageWarnings : 0;
        const previousDayAvg = results[0].previousDay.length > 0 ? results[0].previousDay[0].averageWarnings : 0;
        
        const lastHourTotal = results[0].lastHour.length > 0 ? results[0].lastHour[0].totalWarnings : 0;
        const lastDayTotal = results[0].lastDay.length > 0 ? results[0].lastDay[0].totalWarnings : 0;
        const previousDayTotal = results[0].previousDay.length > 0 ? results[0].previousDay[0].totalWarnings : 0;
    
        const reductionFromPreviousDay = previousDayTotal - lastDayTotal;

   
    let reductionPercentage = 0;
    if (previousDayTotal > 0) {
      reductionPercentage = ((previousDayTotal - lastDayTotal) / previousDayTotal) * 100;
    } else if (previousDayTotal === 0 && lastDayTotal > 0) {
      reductionPercentage = -100; // 100% increase if there were no warnings on the previous day
    }
    
        return NextResponse.json({metric, lastHourTotal,reductionFromPreviousDay,lastDayAvg,lastHourAvg,previousDayAvg,reductionPercentage});
      } catch (err) {
        console.error('Error calculating fatigue metrics:', err);
      }
};
