import { getTask } from '@/prisma/task'
import { notFound } from 'next/navigation'
import * as bb from 'bebras'
import * as fs from 'fs'

export default async function Task({ params }: { params: {taskId: string}}) {
    const {taskId} = params
    const task = await getTask(taskId)
    if(task == null){
        return notFound
    }

    const t_text = getTaskFile(task.filePath)
    const [htmlText, metadata] = bb.convert_html.renderMarkdown(t_text, task.dirPath, false)
    

    
    return (
        // <ul className=' w-4/5'>
        //     <div dangerouslySetInnerHTML={ {__html: htmlText.replace('style', '')} }/>
        // </ul>
        // <div>
        //     {parse(htmlText)}
        // </div>
        
        <HtmlFrame htmlText={htmlText}/>
    )
}

type HtmlFrameProps = { htmlText: string };
function HtmlFrame({htmlText}: HtmlFrameProps) {
    return (  
        <div className=' w-4/5'>
            <iframe srcDoc={htmlText} width="100%" height="100%"> </iframe>
        </div>
    );
}

function getTaskFile(path: string): string {
  const file = fs.readFileSync(path).toString()
  return file
}