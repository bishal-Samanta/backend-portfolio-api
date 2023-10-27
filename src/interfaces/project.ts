export interface Project {
    id: number;
    hero_image_link: string | null;
    title: string;
    sub_title: string;
    content: string;
    date: Date | null;
    github_link: string | null;
    deployed_link: string | null;
    blog_link: string | null;
    type: string;
    created_at: Date;
    updated_at: Date;
}
  