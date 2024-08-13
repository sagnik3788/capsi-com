import { Text } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Select from "react-select";
import useAppStore from '@/store';
import { useIsMobile, useIsTablet } from '@/hooks/useMediaQuery';








const Step2Div = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  justify-content: space-between;
  width: 650px;
  //border:1px solid black;

  @media (max-width: 768px) {
    width:526px;
    flex-direction: column;
    align-items: flex-start;
   
  }
  @media (max-width: 512px) {
    width:100%;
   
  }
`
const SelectDiv = styled.div`


  @media (max-width: 768px) {
   margin-top: 20px;
   
  }
`




const Step2Title = () => {
    const selectedLanguage = useAppStore((state: any) => state?.selectedLanguage)
    const languageOptions = useAppStore((state: any) => state?.languageOptions)
    const setSelectedLanguage = useAppStore((state: any) => state?.setSelectedLanguage)
    const setIsSelectOpen = useAppStore((state: any) => state?.setIsSelectOpen)
    const isMobile=useIsMobile();
    const isTablet=useIsTablet();




    //@ts-ignore
    const handleLanguageChange = (selectedOption) => {
        setSelectedLanguage(selectedOption);
        console.log(
            `Selected language: ${selectedOption ? selectedOption.value : "None"}`
        );
    };

    return (
        <Step2Div>
            <Text
                weight={"medium"}
                size={24}
                css={{ display: "flex", gap: "$3", alignItems: "center"}}
            >
                <Image alt="" height={36} width={36} src="/No2.png" />
                Select Captions Style
            </Text>
            <SelectDiv>
                <label style={{ marginBottom: '10px', fontSize: '12px', fontStyle: 'normal' }} id="aria-label" htmlFor="aria-example-input">
                    Choose the Language
                </label>
                <Select

                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    options={languageOptions}
                    placeholder="Select a language"
                    onMenuOpen={() => setIsSelectOpen(true)}
                    onMenuClose={() => setIsSelectOpen(false)}
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            width: "250px",

                        }),
                    }}
                />
            </SelectDiv>
        </Step2Div>
    );
};

export default Step2Title;