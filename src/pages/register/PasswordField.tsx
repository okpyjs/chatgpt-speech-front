import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
} from '@chakra-ui/react'
import { forwardRef, useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
 
interface CustomInputProps extends InputProps {
    onEnter: (e: any, name?: string) => void;
}

export const PasswordField = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef, ref)
    // const mergeRef1 = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
        onToggle()
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true })
        }
    }

    return (
        <>
        <FormControl>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <InputGroup>
                <InputRightElement>
                    <IconButton
                        variant="link"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
                <Input
                    id="password"
                    ref={mergeRef}
                    name="password"
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    {...props}
                    onKeyDown={(e) => {props.onEnter(e, props.name)}}
                />
            </InputGroup>
        </FormControl>
        {props.name=="signup" &&
        <FormControl>
            <FormLabel htmlFor="repassword">パスワードをもう一度</FormLabel>
            <InputGroup>
                <Input
                    id="repassword"
                    // ref={mergeRef1}
                    name="repassword"
                    type={isOpen ? 'text' : 'password'}
                    // autoComplete="current-password"
                    required
                    {...props}
                    onKeyDown={(e) => {props.onEnter(e, props.name)}}
                />
            </InputGroup>
        </FormControl>
        }
        </>
    )
})

PasswordField.displayName = 'PasswordField'