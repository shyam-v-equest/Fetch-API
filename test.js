Function.prototype.myBind = function(add,num1,num2){
    return num1 + num2;
}

Function.prototype.myCall = function(sub,num1,num2){
    return num1 - num2;
}

Function.prototype.myApply = function(mul,num1,num2){
    return num1 * num2;
}

add(1,2);
sub(5,4);
mul(5,6);