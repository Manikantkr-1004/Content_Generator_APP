import React, { useState } from 'react'
import {Box, Button, Flex, Input, useToast} from "@chakra-ui/react";
import MarkdownPreview  from '@uiw/react-markdown-preview';
import axios from "axios"

export function Generator() {

    const [language,setLanguage] = useState("");
    const [content,setContent] = useState("");
    const [code,setCode] = useState("// Write Your Code here.");
    const [result,setResult] = useState("### Here you will get Result😃😃.");
    const toast = useToast();

    const handleGenerate = ()=>{

        if(content===""){
            toast({
                status:"warning",
                title:"Please Write Topic Name to Generate...",
                isClosable:true,
                duration:2000,
                position:"top"
            })
            return;
        }

        setResult("### Please Wait....");

        axios.post("https://generator-fb3g.onrender.com/generate",{input: `Generate content on ${content} topic in 200 or 300 words.\n Don't give me any another things in response only give me content related to ${content} topic in 200-300 words`})
        .then((res)=>{
            setResult(res.data);
        }).catch((err)=>{
            setResult("### Something went wrong, Please refresh or try again!!")
        })
    }

    const handleSummarize = ()=>{
        if(content===""){
            toast({
                status:"warning",
                title:"Plese write or paste your content to summarize...",
                isClosable:true,
                duration:3000,
                position:"top"
            })
            return;
        }

        setResult("### Please Wait....");

        axios.post("https://generator-fb3g.onrender.com/generate",{input: `Summarize this given content in short as much as possible.\n Here is content.\n ${content}`})
        .then((res)=>{
            setResult(res.data);
        }).catch((err)=>{
            setResult("### Something went wrong, Please refresh or try again!!")
        })
    }
    
    const handleTranslate = ()=>{
        if(content===''){
            toast({
                status:"warning",
                title:"Please write any Text to Translate...",
                isClosable:true,
                duration:3000,
                position:"top"
            })
            return;
        }

        if(language===''){
            toast({
                status:"warning",
                title:"Please write the language name to convert....",
                isClosable:true,
                duration:3000,
                position:"top"
            })
            return;
        }

        setResult("### Please Wait....");

        axios.post("https://generator-fb3g.onrender.com/generate",{input: `Translate this text - ${content} into this ${language}.\n Don't give me any other things or suggestions, only give me translated language as a response`})
        .then((res)=>{
            setResult(res.data);
        }).catch((err)=>{
            setResult("### Something went wrong, Please refresh or try again!!")
        })
    }

    return (
        <Box h="100vh" w="100%">
            <Flex w="100%" bg="#e2e2e2" justifyContent="space-evenly" gap="10px" alignItems="center" h="15%">
                <Input value={language} onChange={(e)=> setLanguage(e.target.value)} w="26%" border="2px solid black" type='text' placeholder='Enter Your Choices Language to Translate...' />
                <Button isDisabled={result==="### Please Wait...."} _hover={{bg:"black"}} onClick={handleGenerate} _focus={{border:"3px solid #747474"}} variant="unstyled" bg="black" color="white" w="21%">GENERATE</Button>
                <Button isDisabled={result==="### Please Wait...."} _hover={{bg:"black"}} onClick={handleSummarize} _focus={{border:"3px solid #747474"}} variant="unstyled" bg="black" color="white" w="21%">SUMMARIZE</Button>
                <Button isDisabled={result==="### Please Wait...."} _hover={{bg:"black"}} onClick={handleTranslate} _focus={{border:"3px solid #747474"}} variant="unstyled" bg="black" color="white" w="21%">TRANSLATE</Button>
            </Flex>

            <Input value={content} onChange={(e)=> setContent(e.target.value)} w="100%" h="10%" border="2px solid black" bg="#fffebf" borderRadius="0px" type="text" placeholder="Enter Text to Translate / Topic Name to Generate / Content to Summarize..." />
            
            <Box w="100%" h="75%" p="10px" color="black" overflow="auto"
            fontSize="20px" fontWeight="semibold" borderLeft="2px solid black">
                <MarkdownPreview border="none" source={result} />
            </Box>

        </Box>
    )
}
