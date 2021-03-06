
import * as React from "react";
import { GlobalState } from '../../globalState';
import { LineContainerComponent } from '../../sharedComponents/lineContainerComponent';
import { DraggableLineComponent } from '../../sharedComponents/draggableLineComponent';

require("./nodeList.scss");

interface INodeListComponentProps {
    globalState: GlobalState;
}

export class NodeListComponent extends React.Component<INodeListComponentProps, {filter: string}> {

    private static _Tooltips: {[key: string]: string} = {
        "BonesBlock": "Provides a world matrix for each vertex, based on skeletal (bone/joint) animation",
        "MorphTargetsBlock": "Provides the final positions, normals, tangents, and uvs based on morph targets in a mesh",
        "AddBlock": "Adds the left and right inputs of the same type together",
        "DistanceBlock": "Provides a distance vector based on the left and right input vectors",
        "DivideBlock": "Divides the left input by the right input of the same type",
        "LengthBlock": "Outputs the length of an input vector",
        "MaxBlock": "Outputs the largest value between the left and right inputs of the same type",
        "MinBlock": "Outputs the smallest value between the left and right inputs of the same type",
        "MultiplyBlock": "Multiplies the left and right inputs of the same type together",
        "NegateBlock": "Multiplies the input by -1",
        "OneMinusBlock": "Subtracts each channel of the input value from 1 (1 - input)",
        "RandomNumberBlock": "Provides a random number based on an input seed",
        "ReciprocalBlock": "Quotient of 1 divided by the input",
        "ScaleBlock": "Multiplies the input channels by a float factor",
        "SubtractBlock": "Subtracts the right input from the left input of the same type",
        "GradientBlock": "Returns the color in the gradient represented by the target value of the input",
        "PosterizeBlock": "Reduces the number of values in each channel to the number in the corresponding channel of steps",
        "ReplaceColorBlock": "Replaces a reference color in value with the color in replacement blended by distance",
        "ColorMergerBlock": "Combines float input channels into a color",
        "ColorSplitterBlock": "Separates color input channels into individual floats",
        "VectorMergerBlock": "Combines up to four input floats into a vector",
        "VectorSplitterBlock": "Separates vectors input channels into individual floats",
        "Color3": "A color made up of red, green, and blue channel values",
        "Color4": "A color made up of red, green, blue, and alpha channel values",
        "DeltaTimeBlock": "A float representing the time that has passed since the last frame was rendered",
        "Float": "A floating point number representing a value with a fractional component",
        "TextureBlock": "A node for reading a linked or embedded texture file",
        "TimeBlock": "A float value that represents the time that has passed since the scene was loaded",
        "Vector2": "a vector composed of X and Y channels",
        "Vector3": "a vector composed of X, Y, and Z channels",
        "Vector4": "a vector composed of X, Y, Z, and W channels",
        "LerpBlock": "Outputs a value that is a mix of the left and right inputs based on the target value",
        "NLerpBlock": "Outputs a value that is a mix of the left and right inputs based on the target's normalized value",
        "SmoothStepBlock": "Outputs a value based on a the input value's position on a curve between the two edge values",
        "StepBlock": "Outputs 1 for any input value above the edge input, outputs 0 for any input value below the edge input",
        "Matrix": "A 4x4 table of related values",
        "ProjectionMatrixBlock": "A matrix to remap points in 3D space to 2D plane relative to the screen",
        "ViewMatrixBlock": "A matrix to remap points in 3D space to 2D plane relative to the view of the scene camera",
        "ViewProjectionMatrixBlock": "A matrix to remap points in 3D space to 2D view space before remapping to 2D screen space",
        "WorldMatrixBlock": "A matrix to remap points in 3D local space to 3D world space",
        "WorldViewProjectionMatrixBlock": "A matrix to remap points in 3D local space to 3D world space, then to 2D camera space, and ending in 2D screen space",
        "ColorBlock": "Outputs the RGBA color of each vertex in the mesh",
        "InstancesBlock": "Provides the world matrix for each instance to apply this material to all instances",
        "MatrixIndicesBlock": "A Vector4 representing the vertex to bone skinning assignments",
        "MatrixWeightsBlock": "A Vector4 representing the vertex to bone skinning weights",
        "NormalBlock": "A Vector3 representing the normal of each vertex of the attached mesh",
        "PositionBlock": "A Vector3 representing the position of each vertex of the attached mesh",
        "TangentBlock": "A Vector3 representing the tangent of each vertex of the attached mesh",
        "UVBlock": "A Vector2 representing the UV coordinates of each vertex of the attached mesh",
        "WorldNormal": "A Vector4 representing the normal of each vertex of the attached mesh transformed into world space",
        "WorldTangent": "A Vector4 representing the tangent of each vertex of the attached mesh transformed into world space",
        "PerturbNormalBlock": "Creates high-frequency detail normal vectors based on a normal map, the world position, and world normal",
        "NormalBlend": "Outputs the result of blending two normal maps together using a per-channel screen",
        "WorldPosition": "A Vector4 representing the position of each vertex of the attached mesh transformed into world space",
        "DiscardBlock": "A final node that will not output a pixel below the cutoff value",
        "FragmentOutputBlock": "A mandatory final node for outputing the color of each pixel",
        "VertexOutputBlock": "A mandatory final node for outputing the position of each vertex",
        "ClampBlock": "Outputs values above the maximum or below minimum as maximum or minimum values respectively",
        "NormalizeBlock": "Remaps the length of a vector or color to 1",
        "RemapBlock": "Remaps input value between sourceMin and sourceMax to a new range between targetMin and targetMax",
        "CeilingBlock": "Outputs fractional values as the next higher whole number",
        "FloorBlock": "Outputs fractional values as the next lower whole number",
        "RoundBlock": "Outputs fractional values rounded to the nearest whole number",
        "CameraPositionBlock": "Outputs a Vector3 position of the active scene camera",
        "FogBlock": "Applies fog to the scene with an increasing opacity based on distance from the camera",
        "FogColorBlock": "The system value for fog color pulled from the scene",
        "ImageProcessingBlock": "Provides access to all of the Babylon image processing properties",
        "LightBlock": "Outputs diffuse and specular contributions from one or more scene lights",
        "LightInformationBlock": "Provides the direction, color and intensity of a selected light based on its world position",
        "ReflectionTextureBlock": "Creates a reflection from the input texture",
        "ViewDirectionBlock": "Outputs the direction vector of where the camera is aimed",
        "AbsBlock": "Outputs the absolute value of the input value",
        "ArcCosBlock": "Outputs the inverse of the cosine value based on the input value",
        "ArcSinBlock": "Outputs the inverse of the sine value based on the input value",
        "ArcTan2Block": "Outputs the inverse of the tangent value based on the input value",
        "ArcTanBlock": "Outputs the inverse of the tangent value based on the input value",
        "CosBlock": "Outputs the cosine value based on the input value",
        "DegreesToRadiansBlock": "Converts the input degrees value to radians",
        "Exp2Block": "Outputs the input value multiplied by itself 1 time. (Exponent of 2)",
        "ExpBlock": "Outputs the input value multiplied by itself 9 time. (Exponent of 10)",
        "FractBlock": "Outputs only the fractional value of a floating point number",
        "LogBlock": "The logarithmic value based on the input value",
        "PowBlock": "Outputs the input value multiplied by itself the number of times equal to the power input (Exponent of power)",
        "RadiansToDegreesBlock": "Converts the input radians value to degrees",
        "SawToothWaveBlock": "Outputs a sawtooth pattern value between -1 and 1 based on the input value",
        "SignBlock": "returns 1 if the input is positive, 0 if input is equal to 0, or -1 if the input is negative",
        "SinBlock": "Outputs the the sine value based on the input value",
        "SqrtBlock": "Outputs the the square root of the input value",
        "SquareWaveBlock": "Outputs a stepped pattern value between -1 and 1 based on the input value",
        "TanBlock": "Outputs the the tangent value based on the input value",
        "TriangleWaveBlock": "Outputs a sawtooth pattern value between 0 and 1 based on the input value",
        "CrossBlock": "Outputs a vector that is perpendicular to two input vectors",
        "DotBlock": "Outputs the cos of the angle between two vectors",
        "FresnelBlock": "Outputs the grazing angle of the surface of the mesh, relative to a camera influenced by the bias and power inputs",
        "TransformBlock": "Transforms a input vector based on the input matrix",
        "DerivativeBlock": "FRAGMENT SHADER ONLY. Provides the rate of change for an input on a given axis (x,y).",
        "DesaturateBlock": "Convert a color input into a grayscale representation.",
        "WorldViewMatrixBlock": "A matrix to remap points in 3D local space to 3D world space, and ending in 2D camera space.",
        "FrontFacingBlock": "Returns 1 if a mesh triangle faces the normal direction and 0 if it does not.",
        "SimplexPerlin3DBlock": "Creates a type of gradient noise with few directional artifacts.",
        "WorleyNoise3DBlock": "Creates a random pattern resembling cells.",
        "ReflectBlock": "Outputs the direction of the input vector reflected across the surface normal.",
        "RefractBlock": "Outputs a direction simulating a deflection of the input vector.",
        "Rotate2dBlock": "Rotates UV coordinates around the W axis.",
        "PBRMetallicRoughnessBlock": "PBR metallic/roughness material",
        "SheenBlock": "PBR Sheen block",
        "AmbientOcclusionBlock": "PBR Ambient occlusion block",
        "ReflectivityBlock": "PBR Reflectivity block",
        "AnisotropyBlock": "PBR Anisotropy block",
        "ReflectionBlock": "PBR Reflection block",
        "ClearCoatBlock": "PBR ClearCoat block",
    };

    constructor(props: INodeListComponentProps) {
        super(props);

        this.state = { filter: "" };
    }

    filterContent(filter: string) {
        this.setState({ filter: filter });
    }

    render() {
        // Block types used to create the menu from
        const allBlocks = {

            Animation: ["BonesBlock", "MorphTargetsBlock"],
            Color_Management: ["ReplaceColorBlock", "PosterizeBlock", "GradientBlock", "DesaturateBlock"],
            Conversion_Blocks: ["ColorMergerBlock", "ColorSplitterBlock", "VectorMergerBlock", "VectorSplitterBlock"],
            Inputs: ["Float", "Vector2", "Vector3", "Vector4", "Color3", "Color4", "TextureBlock", "ReflectionTextureBlock", "TimeBlock", "DeltaTimeBlock"],
            Interpolation: ["LerpBlock", "StepBlock", "SmoothStepBlock", "NLerpBlock"],
            Math__Standard: ["AddBlock", "DivideBlock", "MaxBlock", "MinBlock", "MultiplyBlock", "NegateBlock", "OneMinusBlock", "ReciprocalBlock", "ScaleBlock", "SignBlock", "SqrtBlock", "SubtractBlock"],
            Math__Scientific: ["AbsBlock", "ArcCosBlock", "ArcSinBlock", "ArcTanBlock", "ArcTan2Block", "CosBlock", "DegreesToRadiansBlock", "ExpBlock", "Exp2Block", "FractBlock", "LogBlock", "PowBlock", "RadiansToDegreesBlock", "SawToothWaveBlock", "SinBlock", "SquareWaveBlock", "TanBlock", "TriangleWaveBlock"],
            Math__Vector: ["CrossBlock", "DerivativeBlock", "DistanceBlock", "DotBlock", "FresnelBlock", "LengthBlock", "ReflectBlock", "RefractBlock", "Rotate2dBlock", "TransformBlock", ],
            Matrices: ["Matrix", "WorldMatrixBlock", "WorldViewMatrixBlock", "WorldViewProjectionMatrixBlock", "ViewMatrixBlock", "ViewProjectionMatrixBlock", "ProjectionMatrixBlock"],
            Mesh: ["InstancesBlock", "PositionBlock", "UVBlock", "ColorBlock", "NormalBlock", "PerturbNormalBlock", "NormalBlendBlock" , "TangentBlock", "MatrixIndicesBlock", "MatrixWeightsBlock", "WorldPositionBlock", "WorldNormalBlock", "WorldTangentBlock", "FrontFacingBlock"],
            Noises: ["RandomNumberBlock", "SimplexPerlin3DBlock", "WorleyNoise3DBlock"],
            Output_Nodes: ["VertexOutputBlock", "FragmentOutputBlock", "DiscardBlock"],
            PBR: ["PBRMetallicRoughnessBlock", "AmbientOcclusionBlock", "AnisotropyBlock", "ClearCoatBlock", "ReflectionBlock", "ReflectivityBlock", "SheenBlock"],
            Range: ["ClampBlock", "RemapBlock", "NormalizeBlock"],
            Round: ["RoundBlock", "CeilingBlock", "FloorBlock"],
            Scene: ["FogBlock", "CameraPositionBlock", "FogColorBlock", "ImageProcessingBlock", "LightBlock", "LightInformationBlock", "ViewDirectionBlock"],
        };

        // Create node menu
        var blockMenu = [];
        for (var key in allBlocks) {
            var blockList = (allBlocks as any)[key].filter((b: string) => !this.state.filter || b.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
            .sort((a: string, b: string) => a.localeCompare(b))
            .map((block: any, i: number) => {
                let tooltip = NodeListComponent._Tooltips[block] || "";

                return <DraggableLineComponent key={block} data={block} tooltip={tooltip}/>;
            });

            if (blockList.length) {
                blockMenu.push(
                    <LineContainerComponent key={key + " blocks"} title={key.replace("__", ": ").replace("_", " ")} closed={false}>
                        {blockList}
                    </LineContainerComponent>
                );
            }
        }

        return (
            <div id="nodeList">
                <div className="panes">
                    <div className="pane">
                        <div className="filter">
                            <input type="text" placeholder="Filter"
                                onFocus={() => this.props.globalState.blockKeyboardEvents = true}
                                onBlur={(evt) => {
                                    this.props.globalState.blockKeyboardEvents = false;
                                }}
                                onChange={(evt) => this.filterContent(evt.target.value)} />
                        </div>
                        <div className="list-container">
                            {blockMenu}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}