import { Text } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

const Step1Title = () => {
    return (
        <Text
            weight={"medium"}
            size={24}
            css={{
               // border: "1px solid black",
                textAlign: "left",
                display: "flex",
                gap: "$3",
                alignItems: "center",
                marginTop: "20px",
            }}
        >
            <Image alt="" height={32} width={32} src="/No1.png" />
            Upload Video
        </Text>
    );
};

export default Step1Title;