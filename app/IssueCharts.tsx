'use client'
import { Card } from '@radix-ui/themes';
import React from 'react'
import { ResponsiveContainer,XAxis,YAxis,BarChart,Bar} from 'recharts'
interface Props{
    open:number;
    close:number,
    inProgress:number
    }
const IssueCharts = ({open,close,inProgress}:Props) => {
    const data=[
        {label:'Open', value:open},
        {label:'Closed', value:close},
        {label:'In progress', value:inProgress}
    ]
  return (
    <Card>
        <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data}>
            <XAxis dataKey='label'/>
            <YAxis/>
            <Bar dataKey='value' barSize={60} style={{fill:'var(--accent-9'}}/>
            </BarChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default IssueCharts