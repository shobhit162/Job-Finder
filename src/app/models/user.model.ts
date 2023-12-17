export class User{
constructor(
    public id: string,
    public company: string,
    public location: string,
    public skills: string[],
    public apply_now: string,
    public logo: string,
    public pack: string,
    public profile: string
){};
}