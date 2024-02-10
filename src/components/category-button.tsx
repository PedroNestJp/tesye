import { Text, Pressable, PressableProps } from "react-native";
import clsx from "clsx";

type CategoryProps = PressableProps & {
    title: string,
    isSelected?: boolean,

}

export function CategoryButton({ title, isSelected, ...rest }: CategoryProps) {
    return (
        <Pressable className={
            clsx(
                "bg-slate-800 rounded-md px-4 justify-center h-10", isSelected && "border-2 border-lime-500"
 )
                } 
                {...rest} >
            <Text className="text-slate-100 font-subTitle text-sm"> {title} </Text>
        </Pressable>
    )
}