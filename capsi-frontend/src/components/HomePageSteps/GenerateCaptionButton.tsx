import { CONSTS } from '@/constants';
import useAppStore from '@/store';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';
import Routes from '../../../routes';


const StyledButton = styled(Button)`
width: 400px;
margin-top: 20px;

padding: 16px 20px;

@media (max-width: 480px) {
   width: 80vw;
   
  }
`


const GenerateCaptionButton = () => {

    const setVisible = useAppStore((state: any) => state.setIsModalVisible)
    const setStartProcessing = useAppStore((state: any) => state.setIsProcessing)
    const router=useRouter();


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <StyledButton
                rounded
                onPress={() => {
                   // setVisible(true)
                    router.push(Routes.edit.path)
                    setStartProcessing(true)
                }}
                css={{
                    backgroundColor: `${CONSTS.BRAND_COLORS.PRIMARY}`,
                }}
            >
                Generate Captions
            </StyledButton>
        </div>
    );
};

export default GenerateCaptionButton;