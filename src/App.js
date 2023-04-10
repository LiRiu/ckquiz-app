import React, { useState } from 'react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputGroup,
  FormHelperText,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { register } from './ether/register';
import { ethers } from 'ethers';

const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner()
const sdk = ThirdwebSDK.fromSigner(signer);
const abi = require('./ether/abi.json');
export const ethereum = window.ethereum;


export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [isSend, setIsSend] = useState(false);
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [quizId, setQuizId] = useState(0);
  const [executeLog, setExecuteLog] = useState('Create');
  const [connected, setConnected] = useState(false);
  const [backLog, setBackLog] = useState('Back');
  function handleConnectClick(){
    ethereum
      .enable()
      .then(([ethAddr]) => {
        setConnected(true);
      })
  }
  handleConnectClick()

  function handleWeb3Click() {
    sdk.getContract(
      "0xD3afe038E3C318987A98143cf44CFCaFFD750c2B", // The address of your smart contract
      abi, // The ABI of your smart contract
    ).then((contract) => {
      setIsSending(true);
      const [PKx, PKy] = register(answer);
      contract.call("register", [PKx, PKy],{value: ethers.utils.parseEther("10")}).then((result) => {
        const receipt = result;
        const _quizId = Number(receipt.receipt.logs[0].data);
        setQuizId(_quizId);
        setIsSend(true);
        setIsSending(false);
        setExecuteLog('Done');
        toast({
          title: "Quiz Created Success",
          description: "TxHash: " + receipt.receipt.transactionHash,
          status: "success",
          duration: 8000,
          isClosable: true,
        })
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  const Form1 = () => {
    function handleTextOnChange(event) {
    }

    function handleAnswerOnChange(event) {
    }
    return (
      <>
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
          Quiz Details
        </Heading>
        <Flex>
          <FormControl mt="2%" isRequired>
            <FormLabel fontWeight={'normal'}>
              Quiz Text
            </FormLabel>
            <Input onChange={handleTextOnChange} id="quiz-text" placeholder="What ZKP Scheme is CKQuiz used?"/>
          </FormControl>
        </Flex>
        <FormControl mt="2%" isRequired>
          <FormLabel htmlFor="quiz-answer" fontWeight={'normal'}>
            Quiz Answer
          </FormLabel>
          <Input onChange={handleAnswerOnChange} id="quiz-answer" placeholder="Schnorr"/>
          <FormHelperText>We recommend a one-word answer that case-insensitive.</FormHelperText>
        </FormControl>
      </>
    );
  };

  const Form2 = () => {
    return (
      <>
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
          Reward Details
        </Heading>
        <FormControl as={GridItem} colSpan={[6, 3]}>
          <FormLabel
            htmlFor="reward-type"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            Reward Type
          </FormLabel>
          <Select
            id="reward-type"
            name="reward-type"
            autoComplete="reward-type"
            defaultValue={'CKB (Godwoken testnet)'}
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md">
            <option>CKB (Godwoken testnet)</option>
            <option disabled>CKB (Godwoken mainnet)</option>
            <option disabled>Token (Godwoken testnet)</option>
            <option disabled>Token (Godwoken mainnet)</option>
            <option disabled>NFT (Godwoken testnet)</option>
            <option disabled>NFT (Godwoken mainnet)</option>
          </Select>
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            htmlFor="reward-total-amount"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
            mt="2%">
            Rewards Total Amount
          </FormLabel>
          <Input
            type="number"
            name="reward-total-amount"
            id="reward-total-amount"
            autoComplete="reward-total-amount"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            placeholder='10'
            disabled
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            htmlFor="reward-per-amount"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
            mt="2%">
            Reward Amount
          </FormLabel>
          <Input
            type="number"
            name="reward-per-amount"
            id="reward-per-amount"
            autoComplete="reward-per-amount"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            placeholder='1'
            disabled
          />
        </FormControl>
      </>
    );
  };

  const Form3 = () => {
    const notion_url = "https://ckquiz-challenge.vercel.app/?id=" + quizId + "&text=" + text;
    return (
      <>
        <Heading w="100%" textAlign={'center'} fontWeight="normal">
          Success!
        </Heading>
        <SimpleGrid columns={1} spacing={6}>
          <FormControl as={GridItem} colSpan={[3, 2]}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: 'gray.50',
              }}>
              Notion Widget
            </FormLabel>
            <InputGroup size="sm">
              <Input
                type="text"
                focusBorderColor="brand.400"
                rounded="md"
                defaultValue={notion_url}
              />
            </InputGroup>
          </FormControl>

          <FormControl id="email" mt={1}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="gray.700"
              _dark={{
                color: 'gray.50',
              }}>
              Mirror.xyz
            </FormLabel>
            <InputGroup size="sm">
              <Input
                type="text"
                focusBorderColor="brand.400"
                rounded="md"
                defaultValue={notion_url}
              />
            </InputGroup>
            <FormHelperText>
              Paste link according to the platform
            </FormHelperText>
          </FormControl>
        </SimpleGrid>
      </>
    );
  };
  

  
  return (
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="100px auto"
        as="form">
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          colorScheme={'green'}
          isAnimated></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  if(step === 3){
                    window.location.reload()
                  }
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%">
                {backLog}
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3 || (step === 2 && isSend === false) || (step === 1 && connected === false)}
                onClick={() => {
                  if (step === 2) {
                    setProgress(100);
                    setBackLog('Home');
                  } else if(step === 1) {
                    setAnswer(document.getElementById("quiz-answer").value);
                    setText(encodeURI(document.getElementById('quiz-text').value));
                    setProgress(progress + 33.33);
                  }
                  else {
                    setProgress(progress + 33.33);
                  }
                  setStep(step + 1);
                }}
                colorScheme="teal"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 2 ? (
              <Button onClick={handleWeb3Click}
              isLoading={isSending}
              loadingText='Sending'
              isDisabled={isSend}
              >
                {executeLog}
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
  );
}