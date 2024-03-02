from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
import csv
import dask.dataframe as dd
import os
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)



class TagBody(BaseModel):
    tagnumber: str



class DateRange(BaseModel):
    tag: str  # Assuming the tag is a string.
    from_date: str
    to_date: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

@app.get("/tag")
def read_tag():
    # Full path to the keys.csv file inside the Docker container
    file_path = '/data-sphere/src/data/keys.csv'
    #file_path = './data/keys.csv'
    
    # Check if the file exists
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="CSV file not found")
    
    try:
        # Read the CSV file using Dask
        data_df = dd.read_csv(file_path, header=None, assume_missing=True)
        
        # Compute unique values from the first column
        unique_names = data_df[0].unique().compute()
        
        # Convert to list and return the response
        return {"unique_tags": unique_names.tolist()}
    except Exception as e:
        # Log the exception for debugging purposes
        print(f"An error occurred: {e}")
        # Return a detailed HTTP exception with the error message
        raise HTTPException(status_code=500, detail=str(e))

class AnalysisRequest(BaseModel):
    tag: str
    from_date: str
    to_date: str

@app.post("/analyze")
def analyze_data(request: AnalysisRequest):
    data_file = os.path.join('/data-sphere/src/data', 'Data.csv')  # Update to your CSV file path
    
    if not os.path.isfile(data_file):
        raise HTTPException(status_code=404, detail="CSV file not found")
    
    try:
        # Read the CSV file using Dask
        data_df = dd.read_csv(data_file, header=None, assume_missing=True)
        data_df.columns = ['tag', 'value', 'timestamp', 'other']

        # Convert the 'timestamp' column to datetime
        data_df['timestamp'] = dd.to_datetime(data_df['timestamp'], errors='coerce')

        # Filter data based on the tag and the date range
        filtered_df = data_df[(data_df['tag'] == float(request.tag)) & 
                              (data_df['timestamp'] >= datetime.strptime(request.from_date, '%Y-%m-%d')) & 
                              (data_df['timestamp'] <= datetime.strptime(request.to_date, '%Y-%m-%d'))]

        # Exclude rows with null or zero 'value'
        valid_values = filtered_df[filtered_df['value'] > 0]['value']

        # Calculate statistics
        # Calculate statistics
        mean_value = valid_values.mean().compute()

        
        max_value = valid_values.max().compute()
        min_value = valid_values.min().compute()


        # Construct the response
        stats = {
            "mean": mean_value,
            "max": max_value,
            "min": min_value
        }

        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
class AnalyzeToFromRequest(BaseModel):
    tag: str
    from_date: str
    to_date: str

@app.post("/analyzetofrom")
async def analyze_to_from(request: AnalyzeToFromRequest):
    data_file = '/data-sphere/src/data/Data.csv'  # Ensure this path is correct
    
    if not os.path.isfile(data_file):
        raise HTTPException(status_code=404, detail="CSV file not found")
    
    try:
        # Read the CSV file using Dask
        data_df = dd.read_csv(data_file)
        # Set column names if known
        data_df.columns = ['tag', 'value', 'timestamp', 'other']
        
        # Convert 'timestamp' column to datetime and filter by date range
        data_df['timestamp'] = dd.to_datetime(data_df['timestamp'])
        filtered_df = data_df[(data_df['tag'] == float(request.tag)) & 
                              (data_df['timestamp'] >= datetime.strptime(request.from_date, "%Y-%m-%d")) & 
                              (data_df['timestamp'] <= datetime.strptime(request.to_date, "%Y-%m-%d"))]
        
        # Group by date and calculate statistics
        grouped = filtered_df.groupby(filtered_df['timestamp'].dt.date)['value']
        min_values = grouped.min().compute()
        max_values = grouped.max().compute()
        mean_values = grouped.mean().compute()
        
        # Prepare response
        response = []
        for date in min_values.index:
            stats = {
                "date": str(date),
                "min": min_values.loc[date],
                "max": max_values.loc[date],
                "mean": mean_values.loc[date],
                "average": mean_values.loc[date]  # mean and average are the same in this context
            }
            response.append(stats)
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
